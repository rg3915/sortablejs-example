const url = 'http://localhost:3000/items'

const getItems = () => ({
  items: [],
  sortedItems: [],
  itemIds: [],

  init() {
    this.getData()

    const list = document.getElementById('sortable-list')
    new Sortable(list, {
      animation: 150,
      onUpdate: (event) => {
        this.saveOrder()
      }
    })
  },

  getData() {
    axios(url)
      .then(response => {
        this.items = response.data
        this.sortedItems = this.items.slice().sort((a, b) => a.order - b.order)
      })
  },

  saveOrder() {
    const listItems = document.querySelectorAll('#sortable-list .sortable-item')
    const itemIds = []

    let index = 0

    listItems.forEach(item => {
      const dataId = item.getAttribute('data-id')
      index++
      itemIds.push(dataId)
    })

    this.itemIds = itemIds
    let index2 = 0

    console.log(this.itemIds)

    this.itemIds.forEach(id => {
      index2++
      const bodyData = {
        "id": `${id}`,
        "order": index2
      }
      axios.patch(`${url}/${id}`, bodyData)
    })
  }
})
