output "redis_private_ip" {
  value = data.azurerm_network_interface.redis_private_endpoint_nic.ip_configuration[0].private_ip_address
}

output "redis_ssl_connection_string" {
  value     = "redis://${azurerm_redis_cache.redis.hostname}:${azurerm_redis_cache.redis.ssl_port},password=${azurerm_redis_cache.redis.primary_access_key},ssl=True,abortConnect=False"
  sensitive = true
}

output "redis_non_ssl_connection_string" {
  value     = "redis://${azurerm_redis_cache.redis.hostname}:${azurerm_redis_cache.redis.port},password=${azurerm_redis_cache.redis.primary_access_key},ssl=False,abortConnect=False"
  sensitive = true
}

output "redis_hostname" {
  value = azurerm_redis_cache.redis.hostname
}

output "redis_port" {
  value = azurerm_redis_cache.redis.ssl_port
}

output "redis_non_ssl_port" {
  value = azurerm_redis_cache.redis.port
}

output "redis_subnet_id" {
  description = "Value of the redis subnet id"
  value       = azurerm_subnet.redis.id
}
