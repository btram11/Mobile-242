output "sa_endpoint" {
  value = module.cdn.sa_hostname
}

output "sa_key" {
  value     = module.cdn.sa_key
  sensitive = true
}

output "sa_name" {
  value = module.cdn.sa_name
}
