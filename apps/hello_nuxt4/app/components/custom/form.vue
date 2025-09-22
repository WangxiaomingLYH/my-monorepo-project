<script setup lang="ts">
// 未完成

const firstName = ref("");
const num = ref(0);
const rules = ref([
  (value: string) => {
    if (value) return true;
    return "This is a required field.";
  },
]);

function submit() {
  console.log(firstName.value, "@firstName");
  console.log(num.value, "@num");
}
</script>

<template>
  <v-form @submit.prevent>
    <v-text-field
      v-model="firstName"
      :rules="rules"
      label="First name"
    ></v-text-field>
    <v-number-input
      :reverse="false"
      v-model="num"
      controlVariant="default"
      label=""
      :hideInput="false"
      :inset="false"
    ></v-number-input>
    <v-btn @click="submit" class="mt-2" type="submit" block>Submit</v-btn>
  </v-form>
</template>

<style scoped lang="scss"></style>
