sudo apt update
sudo apt upgrade
sudo apt install postgresql-client-16 -y
sudo apt install nodejs npm -y
mkdir app
cd app
git init
git config core.sparseCheckout true
git remote add -f origin https://github.com/btram11/Mobile-242.git
echo "backend/*" > .git/info/sparse-checkout
git checkout main
cd backend
npm install
npm run migrate_dev
npm run seed_dev
npm run start