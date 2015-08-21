Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.provision "shell", path: "bootstrap.sh", privileged: false
  	config.vm.provider "virtualbox" do |v|
    	v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    	v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
	end
end