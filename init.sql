CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
