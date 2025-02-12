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
  source                  = "../modules/postgres"
  resource_group_name     = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location = azurerm_resource_group.Mobile-242-dev.location
  delegated_subnet_id     = module.vnet.postgres_subnet_id
  private_dns_zone_id     = module.vnet.postgres_private_dns_zone_id
  ssl                     = "off"
}

locals {
  connection_string = "postgresql://${module.postgres.postgres_username}:${module.postgres.postgres_password}@${module.postgres.postgres_fqdn}:5432/mobiledev?schema=public"
  user_data         = <<-EOF
    #!/bin/bash
    export DATABASE_URL=${local.connection_string}
    ${file("${path.module}/scripts/backend_user_data.sh")}
  EOF
}

module "backend" {
  source                  = "../modules/backend"
  resource_group_name     = azurerm_resource_group.Mobile-242-dev.name
  resource_group_location = azurerm_resource_group.Mobile-242-dev.location
  network_interface_ids   = [module.vnet.network_interface_id]
  public_ssh_key          = tls_private_key.ssh.public_key_openssh
  user_data               = base64encode(local.user_data)

  depends_on = [module.postgres]
}
