export function calculateDistance(
  firstLatitude: number,
  firstLongitude: number,
  secondLatitude: number,
  secondLongitude: number,
): number {
  const degreesPerRadian = 180;
  const earthRadiusValueInKilometers = 6371;
  const halfDivision = 2;
  const completeUnit = 1;
  const fullCircle = 2;
  const convertToRadians = (degree: number) => (degree * Math.PI) / degreesPerRadian;

  const earthRadiusInKilometers = earthRadiusValueInKilometers; // Raio da Terra em quilômetros
  const deltaLatitude = convertToRadians(secondLatitude - firstLatitude);
  const deltaLongitude = convertToRadians(secondLongitude - firstLongitude);
  const haversineComponent =
    Math.sin(deltaLatitude / halfDivision) * Math.sin(deltaLatitude / halfDivision) +
    Math.cos(convertToRadians(firstLatitude)) * Math.cos(convertToRadians(secondLatitude)) *
    Math.sin(deltaLongitude / halfDivision) * Math.sin(deltaLongitude / halfDivision);
  const centralAngle = fullCircle * Math.atan2(Math.sqrt(haversineComponent), Math.sqrt(completeUnit - haversineComponent));
  return earthRadiusInKilometers * centralAngle; // Distância em quilômetros
}
