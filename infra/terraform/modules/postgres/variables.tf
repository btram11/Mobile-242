variable "pg_admin_login" {
  description = "The administrator login for the PostgreSQL Server."
  default     = "dbadmin"
}

variable "pg_admin_password" {
  description = "The administrator password for the PostgreSQL Server."
  default     = "P@ssw0rd"
}

variable "random_suffix" {
  description = "A random suffix to append to the PostgreSQL Server name."
  default     = "lola"
}

variable "resource_group_name" {
  description = "The name of the resource group in which to create the PostgreSQL Server."
}

variable "resource_group_location" {
  description = "The location of the resource group in which to create the PostgreSQL Server."
}

variable "delegated_subnet_id" {
  description = "The ID of the subnet to which the PostgreSQL Server should be delegated."
}

variable "private_dns_zone_id" {
  description = "The ID of the private DNS zone for the PostgreSQL Server."
}

variable "ssl" {
  description = "The SSL enforcement setting for the PostgreSQL Server."
  default     = "on"
}
