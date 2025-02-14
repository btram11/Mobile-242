resource "azurerm_subnet" "redis" {
  name                                          = "redis-subnet"
  resource_group_name                           = var.resource_group_name
  virtual_network_name                          = var.virtual_network_name
  address_prefixes                              = var.redis_subnet_address_prefix
  private_link_service_network_policies_enabled = true
}

resource "azurerm_network_security_group" "redis" {
  name                = "redis-nsg"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
}

resource "azurerm_network_security_rule" "redis_inbound" {
  name                        = "redis-inbound"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "6379-6380"
  source_address_prefixes     = var.allowed_subnets_address_prefixes
  destination_address_prefix  = azurerm_subnet.redis.address_prefixes[0]
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.redis.name
}

resource "azurerm_network_security_rule" "redis_outbound" {
  name                         = "redis-outbound"
  priority                     = 100
  direction                    = "Outbound"
  access                       = "Allow"
  protocol                     = "Tcp"
  source_port_range            = "*"
  destination_port_range       = "*"
  source_address_prefix        = azurerm_subnet.redis.address_prefixes[0]
  destination_address_prefixes = var.allowed_subnets_address_prefixes
  resource_group_name          = var.resource_group_name
  network_security_group_name  = azurerm_network_security_group.redis.name
}

resource "azurerm_subnet_network_security_group_association" "redis" {
  subnet_id                 = azurerm_subnet.redis.id
  network_security_group_id = azurerm_network_security_group.redis.id
}

resource "azurerm_redis_cache" "redis" {
  name                 = "redis-${var.random_suffix}"
  location             = var.resource_group_location
  resource_group_name  = var.resource_group_name
  capacity             = 0
  family               = "C"
  sku_name             = "Basic"
  non_ssl_port_enabled = var.non_ssl_port_enabled
  minimum_tls_version  = "1.2"
}

resource "azurerm_private_endpoint" "redis" {
  name                = "redis-endpoint"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
  subnet_id           = azurerm_subnet.redis.id

  private_service_connection {
    name                           = "redis-connection"
    private_connection_resource_id = azurerm_redis_cache.redis.id
    is_manual_connection           = false
    subresource_names              = ["redisCache"]
  }
}

resource "azurerm_private_dns_zone" "redis" {
  name                = "privatelink.redis.cache.windows.net"
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "redis" {
  name                  = "redis-vnet-link"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.redis.name
  virtual_network_id    = var.virtual_network_id
}

data "azurerm_network_interface" "redis_private_endpoint_nic" {
  name                = azurerm_private_endpoint.redis.network_interface[0].name
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_a_record" "redis" {
  name                = azurerm_redis_cache.redis.name # Matches the Redis hostname
  zone_name           = azurerm_private_dns_zone.redis.name
  resource_group_name = var.resource_group_name
  ttl                 = 300
  records             = [data.azurerm_network_interface.redis_private_endpoint_nic.ip_configuration[0].private_ip_address]
}
