resource "azurerm_postgresql_flexible_server" "main" {
  name                = "psql-server-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location

  sku_name = "B_Standard_B1ms"

  storage_mb = 32768

  administrator_login    = var.pg_admin_login
  administrator_password = var.pg_admin_password
  version                = "16"
  delegated_subnet_id    = var.delegated_subnet_id
  private_dns_zone_id    = var.private_dns_zone_id

  public_network_access_enabled = false

  lifecycle {
    ignore_changes = [zone, high_availability[0].standby_availability_zone]
  }
}

resource "azurerm_postgresql_flexible_server_configuration" "postgres" {
  name      = "require_secure_transport"
  server_id = azurerm_postgresql_flexible_server.main.id
  value     = var.ssl
}
