variable "resource_group_name" {
  description = "The name of the resource group in which the resources will be created."
}

variable "resource_group_location" {
  description = "The location of the resource group in which the resources will be created."
}

variable "network_interface_ids" {
  description = "The IDs of the network interfaces to attach to the virtual machine."
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
