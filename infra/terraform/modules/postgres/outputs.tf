output "postgres_fqdn" {
  description = "Value of the postgres fqdn"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "postgres_username" {
  description = "Value of the postgres username"
  value       = azurerm_postgresql_flexible_server.main.administrator_login
}

output "postgres_password" {
  description = "Value of the postgres password"
  value       = azurerm_postgresql_flexible_server.main.administrator_password
}
