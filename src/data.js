const slots = [
  { id: 1, type: "type1", location: "location1", capacity: 10, filledNumber: 3, error: true },
  { id: 2, type: "type2", location: "location2", capacity: 20, filledNumber: 5, error: false },
  { id: 3, type: "type3", location: "location3", capacity: 15, filledNumber: 18, error: false },
  { id: 4, type: "type4", location: "location4", capacity: 16, filledNumber: 9, error: false },
  { id: 5, type: "type5", location: "location5", capacity: 16, filledNumber: 1, error: false },
  { id: 6, type: "type6", location: "location6", capacity: 13, filledNumber: 8, error: false },
]

const pallets = [
  { slotId: 1, id: 1, type: "type1", description: "description1", createdDate: "2022/8/10", updateDate: "2022/8/15", condition: "condition1" },
  { slotId: 1, id: 2, type: "type2", description: "description2", createdDate: "2022/8/9", updateDate: "2022/8/14", condition: "condition2" },
  { slotId: 1, id: 3, type: "type3", description: "description3", createdDate: "2022/8/5", updateDate: "2022/8/13", condition: "condition3" },
  { slotId: 1, id: 4, type: "type4", description: "description4", createdDate: "2022/8/3", updateDate: "2022/8/16", condition: "condition4" },
  { slotId: 2, id: 5, type: "type5", description: "description5", createdDate: "2022/8/7", updateDate: "2022/8/11", condition: "condition5" },
  { slotId: 3, id: 6, type: "type6", description: "description6", createdDate: "2022/8/8", updateDate: "2022/8/10", condition: "condition6" },
  { slotId: 2, id: 4, type: "type4", description: "description4", createdDate: "2022/8/3", updateDate: "2022/8/16", condition: "condition4" },
  { slotId: 3, id: 5, type: "type5", description: "description5", createdDate: "2022/8/7", updateDate: "2022/8/11", condition: "condition5" },
  { slotId: 4, id: 6, type: "type6", description: "description6", createdDate: "2022/8/8", updateDate: "2022/8/10", condition: "condition6" },
  { slotId: 5, id: 4, type: "type4", description: "description4", createdDate: "2022/8/3", updateDate: "2022/8/16", condition: "condition4" },
  { slotId: 2, id: 5, type: "type5", description: "description5", createdDate: "2022/8/7", updateDate: "2022/8/11", condition: "condition5" },
  { slotId: 6, id: 6, type: "type6", description: "description6", createdDate: "2022/8/8", updateDate: "2022/8/10", condition: "condition6" },
]

module.exports = {
  slots,
  pallets
}