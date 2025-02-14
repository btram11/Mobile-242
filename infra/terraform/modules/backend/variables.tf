variable "backend_subnet_address_prefix" {
  description = "The address prefix for the backend subnet."
  default     = ["10.0.3.0/24"]
}

variable "backend_domain_name_label" {
  description = "The domain name label for the backend public IP."
  default     = "meomeo-backend"
}

variable "resource_group_name" {
  description = "The name of the resource group in which the resources will be created."
}

variable "resource_group_location" {
  description = "The location of the resource group in which the resources will be created."
}

variable "public_ssh_key" {
  description = "The public SSH key to use for authentication."
}

variable "admin_username" {
  description = "The username for the virtual machine."
  default     = "backendadmin"
}

variable "user_data" {
  description = "The user data to use for the virtual machine."
  default     = ""
}

variable "virtual_network_id" {
  description = "The ID of the virtual network in which the resources will be created."
}

variable "virtual_network_name" {
  description = "The name of the virtual network in which the resources will be created."
}
