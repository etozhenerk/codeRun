function extendTransportSystem(EarthRoute, MoonRoute) {
  const storage = [];
  const oldEarthTransfer = EarthRoute.prototype.transfer;
  EarthRoute.prototype.transfer = function (parcel) {
    storage.push({ ...parcel, origin: "Earth", destination: "Mothership" });
    oldEarthTransfer(parcel);
  };
  const oldMoonTransfer = MoonRoute.prototype.transfer;
  MoonRoute.prototype.transfer = function (parcel) {
    storage.push({ ...parcel, origin: "Moon", destination: "Mothership" });
    oldMoonTransfer(parcel);
  };
  return storage;
}

module.exports = extendTransportSystem;
