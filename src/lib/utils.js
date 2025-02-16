import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeConverter(dateString) {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const timeDiff = currentDate - givenDate;

  // Convert milliseconds to hours and days
  const secDiff = Math.floor(timeDiff / 1000);
  const minDiff = Math.floor(timeDiff / (1000 * 60));
  const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

  if (secDiff < 60) {
    if (secDiff <= 0) {
      return "0 second ago";
    }
    return `${secDiff} seconds ago`;
  } else if (minDiff < 60) {
    return `${minDiff} minutes ago`;
  } else if (hourDiff < 24) {
    return `${hourDiff} hours ago`;
  } else if (dayDiff === 1) {
    return "yesterday";
  } else if (dayDiff < 30) {
    return `${dayDiff} days ago`;
  } else if (monthDiff < 12) {
    return `${monthDiff} months ago`;
  } else {
    return `${yearDiff} years ago`;
  }
}

export const extractBuildingData = (data) => {
  // Item by building
  const buildingMap = new Map();

  data.forEach((item) => {
    const { building_id, building_name, floor_id, floor_name } = item;

    if (!buildingMap.has(building_id)) {
      buildingMap.set(building_id, {
        building_id,
        building_name,
        floors: new Set(), // Track unique floor IDs
        floor_names: new Set(), // Track unique floor names
      });
    }

    // Add floor ID and floor name to their respective sets
    const building = buildingMap.get(building_id);
    building.floors.add(floor_id);
    building.floor_names.add(floor_name);
  });

  // Transform the map to the required output format
  const result = Array.from(buildingMap.values()).map((building) => ({
    building_id: building.building_id,
    building_name: building.building_name,
    number_of_floors: building.floors.size, // Unique floor count
    floor_names: Array.from(building.floor_names), // Convert set to array
  }));

  return result;
};

export const extractUniqueRoomTypesByFloor = (floor_name, data) => {
  // Use a Map to track unique room types and their names for the specified floor
  const roomTypeMap = new Map();

  data.forEach((item) => {
    const { floor_name: itemFloorName, room_type, room_type_name } = item;

    // Check if the item matches the specified floor name
    if (itemFloorName === floor_name) {
      // Add the room type and its name if it doesn't already exist
      if (!roomTypeMap.has(room_type)) {
        roomTypeMap.set(room_type, room_type_name);
      }
    }
  });

  // Transform the map into the desired output format
  const result = Array.from(roomTypeMap.entries()).map(([type, name]) => ({
    room_type: type,
    room_type_name: name,
  }));

  return result;
};

export const getColorByRoomType = (roomType) => {
  switch (roomType) {
    case "WR":
      return "bg-[#93c5fd]";

    case "LR": // blue-200
      return "bg-[#86efac]"; // green-200

    case "SR":
      return "bg-[#fef08a]"; // yellow-200

    case "FR":
      return "bg-[#d8b4fe]"; // purple-200

    case "BCR":
      return "bg-[#fecaca]"; // red-200

    case "CR":
      return "bg-[#c7d2fe]"; // indigo-200

    case "PR":
      return "bg-[#fbcfe8]"; // pink-200

    case "HO":
      return "bg-[#fdba74]"; // orange-200

    case "GR":
      return "bg-[#81e6d9]"; // teal-200

    case "ER":
      return "bg-[#e5e7eb]"; // gray-200

    case "LH":
      return "bg-[#67e8f9]"; // cyan-200

    case "OC":
      return "bg-[#a3e635]"; // lime-200

    case "WS":
      return "bg-[#fbbf24]"; // amber-200

    case "GCR":
      return "bg-[#d6b7a1]"; // brown-200

    case "Adm":
      return "bg-[#7FFFD4]"; // aquamarine

    case "DEP":
      return "bg-[#5D8AA8]";

    case "HEAD":
      return "bg-[#FFA07A]";

    case "AR":
      return "bg-[#FFD700]";

    case "Cafe":
      return "bg-[#FF6347]";

    case "MR":
      return "bg-[#50C878]";

    default:
      return "bg-gray";
  }
};
