var LocationManager = Java.use("android.location.LocationManager");
var Location = Java.use("android.location.Location");
LocationManager.getLastKnownLocation.implementation = function () {
    var l = Location.$new(LocationManager.GPS_PROVIDER);
    l.setLatitude(10.03);
    l.setLongitude(25.05);
    return l;
};

