require('./library/database');
if (process.argv[2]) {
    require('./features')[process.argv[2]]();
} else {
    require('./cronjob');
}