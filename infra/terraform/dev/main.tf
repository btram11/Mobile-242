resource "azurerm_resource_group" "Mobile-242-dev" {
  name     = "Mobile-242-dev"
  location = "South East Asia"
}

module "vnet" {
  source                  = "../modules/vnet"
  resource_group_name     = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location = azurerm_resource_group.Mobile-242-dev.location
}

resource "tls_private_key" "ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "ssh_private_key" {
  content         = tls_private_key.ssh.private_key_pem
  filename        = "./keys/ssh_private_key.pem"
  file_permission = "0600"
}

module "postgres" {
  source                         = "../modules/postgres"
  virtual_network_id             = module.vnet.virtual_network_id
  virtual_network_name           = module.vnet.virtual_network_name
  resource_group_name            = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location        = azurerm_resource_group.Mobile-242-dev.location
  ssl                            = "off"
  postgres_subnet_address_prefix = var.postgres_subnet_address_prefix
}

module "redis" {
  source                           = "../modules/redis"
  virtual_network_id               = module.vnet.virtual_network_id
  virtual_network_name             = module.vnet.virtual_network_name
  resource_group_name              = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location          = azurerm_resource_group.Mobile-242-dev.location
  redis_subnet_address_prefix      = var.redis_subnet_address_prefix
  non_ssl_port_enabled             = true
  allowed_subnets_address_prefixes = var.backend_subnet_address_prefix
}

locals {
  postgres_connection_string = "postgresql://${module.postgres.postgres_username}:${module.postgres.postgres_password}@${module.postgres.postgres_fqdn}:5432/mobiledev?schema=public"
  user_data                  = <<-EOF
    #!/bin/bash
    export DATABASE_URL=${local.postgres_connection_string}
    export REDIS_URL=redis://${module.redis.redis_hostname}:6379
    ${file("${path.module}/scripts/backend_user_data.sh")}
  EOF
}

module "backend" {
  source                        = "../modules/backend"
  virtual_network_id            = module.vnet.virtual_network_id
  virtual_network_name          = module.vnet.virtual_network_name
  resource_group_name           = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location       = azurerm_resource_group.Mobile-242-dev.location
  public_ssh_key                = tls_private_key.ssh.public_key_openssh
  user_data                     = base64encode(local.user_data)
  backend_subnet_address_prefix = var.backend_subnet_address_prefix
}
