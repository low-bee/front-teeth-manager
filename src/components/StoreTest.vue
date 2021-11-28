<template>
  <div>
    <h1>this is a number: {{ $store.state.sum }} </h1>
    <select v-model="value">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">add</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementOdd">奇数add</button>
    <button @click="incrementWait">等待add</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    increment(){

      this.$store.dispatch("increment", this.value)
    },
    decrement(){
    },
    incrementOdd(){
    },

    incrementWait(){
    }
  },
  name: "StoreTest"

}
</script>

<style scoped>

</style>
