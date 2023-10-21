<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'Glue_dashboard');

// Project repository
set('repository', 'git@bitbucket.org:glue-team/dashboard.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

add('shared_files', []);
add('shared_dirs', [
    'public/exports',
    'public/assets/public',
]);
add('writable_dirs', [
    'storage/documents',
]);

set('writable_mode', 'chmod');
set('writable_use_sudo', false);


// Hosts

host('185.86.17.2')
    ->stage('production')
    ->user('gluebe_user')
    ->set('http_user', 'gluebe_user')
    ->set('deploy_path', '~/dashboard.glue.be')
    ->set('bin/php', '/opt/plesk/php/7.2/bin/php')
    ->set('bin/composer', '{{bin/php}} /usr/lib/plesk-9.0/composer.phar')
    ->set('cachetool', '/var/www/vhosts/system/glue.be/dashboard.glue.be/php-fpm.sock')
    ->set('bin/cachetool', '/usr/local/bin/cachetool.phar');
    
// Tasks

task('custom:add_key_to_agent', function () {
    runLocally('ssh-add -k');
});

task('custom:add_known_host', function () {
    runLocally('ssh-keyscan -H {{hostname}} >> ~/.ssh/known_hosts');
    run('ssh-keyscan -H bitbucket.org >> ~/.ssh/known_hosts');
});

task('custom:opcache_clear', function () { 
    run('sudo {{bin/php}} /usr/local/bin/cachetool.phar opcache:reset --fcgi=/var/www/vhosts/system/glue.be/php-fpm.sock');
});

task('build', function () {
    run('cd {{release_path}} && build');
});

task('custom:yarn_install', function () {
    run('cd {{release_path}} && pwd');
    run('cd {{release_path}} && yarn');
    run('cd {{release_path}} && yarn run dev');
});

after('deploy:info', 'custom:add_key_to_agent');
after('deploy:info', 'custom:add_known_host');
after('deploy:failed', 'deploy:unlock');
before('deploy:symlink', 'artisan:migrate');
after('deploy', 'artisan:cache:clear');
before('deploy:symlink', 'custom:yarn_install');
