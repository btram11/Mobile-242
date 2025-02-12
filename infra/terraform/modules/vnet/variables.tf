variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "resource_group_location" {
  description = "Location of the resource group"
}

variable "vnet_address_prefix" {
  description = "Address prefix for vnet"
  default     = ["10.0.0.0/16"]
}

variable "postgres_subnet_address_prefix" {
  description = "Address prefix for the postgres subnet"
  default     = ["10.0.1.0/24"]
}

variable "backend_subnet_address_prefix" {
  description = "Address prefix for the backend subnet"
  default     = ["10.0.2.0/24"]
}
