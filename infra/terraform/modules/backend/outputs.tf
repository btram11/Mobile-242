
output "backend_public_ip" {
  description = "Value of the backend public IP"
  value       = azurerm_public_ip.backend.ip_address
}

output "backend_private_ip" {
  description = "Value of the backend private IP"
  value       = azurerm_network_interface.backend.private_ip_address
}

output "backend_network_interface_id" {
  description = "Value of the backend network interface id"
  value       = azurerm_network_interface.backend.id
}

output "backend_fqdn" {
  description = "Value of the backend FQDN"
  value       = azurerm_public_ip.backend.fqdn
}
