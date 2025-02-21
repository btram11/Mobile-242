resource "azurerm_resource_group" "Mobile-242-dev" {
  name     = "Mobile-242-dev"
  location = "South East Asia"
}

module "key_vault" {
  source                  = "../modules/key_vault"
  resource_group_name     = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location = azurerm_resource_group.Mobile-242-dev.location
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
  key_vault_id                   = module.key_vault.key_vault_id
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
  key_vault_id                     = module.key_vault.key_vault_id
}

module "backend" {
  source                        = "../modules/backend"
  virtual_network_id            = module.vnet.virtual_network_id
  virtual_network_name          = module.vnet.virtual_network_name
  resource_group_name           = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location       = azurerm_resource_group.Mobile-242-dev.location
  public_ssh_key                = tls_private_key.ssh.public_key_openssh
  custom_data                   = base64encode(file("${path.module}/scripts/backend_cloud_init.yaml"))
  backend_subnet_address_prefix = var.backend_subnet_address_prefix
  key_vault_id                  = module.key_vault.key_vault_id
}
