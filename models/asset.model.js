const mongoose = require('mongoose')

const assetSchema = mongoose.Schema({
  title: { type: String, required: true },
  properties: { type: Object },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, required: false },
  assignedAt: {
    type: Date,
    default() {
      return new Date()
    },
  },
})

module.exports = mongoose.model('Asset', assetSchema)
