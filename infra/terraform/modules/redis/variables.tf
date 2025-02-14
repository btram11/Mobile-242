variable "resource_group_location" {
  description = "Location of the resource group"
}

variable "redis_subnet_address_prefix" {
  description = "Value of the address prefix for the Redis cache subnet"
  default     = ["10.0.2.0/24"]
}

variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "allowed_subnets_address_prefixes" {
  description = "Address prefixes for the allowed subnets"
}

variable "virtual_network_id" {
  description = "ID of the virtual network where the Redis cache is deployed"
}

variable "virtual_network_name" {
  description = "Name of the virtual network where the Redis cache is deployed"
}

variable "random_suffix" {
  description = "Random suffix to append to the Redis cache name"
  default     = "meomeo"
}

variable "non_ssl_port_enabled" {
  description = "Flag to enable non-SSL port"
  default     = false
}
