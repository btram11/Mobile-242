output "backend_public_ip" {
  description = "Value of the backend public IP"
  value       = azurerm_public_ip.backend.ip_address
}

output "backend_private_ip" {
  description = "Value of the backend private IP"
  value       = azurerm_network_interface.backend.private_ip_address
}

output "network_interface_id" {
  description = "Value of the network interface id"
  value       = azurerm_network_interface.backend.id
}

output "postgres_subnet_id" {
  description = "Value of the postgres subnet id"
  value       = azurerm_subnet.postgres.id
}

output "postgres_private_dns_zone_id" {
  description = "Value of the postgres private dns zone id"
  value       = azurerm_private_dns_zone.postgres.id
}
