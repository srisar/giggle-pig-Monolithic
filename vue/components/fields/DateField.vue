<template>
  <input type="text" class="form-control date_range_field" ref="field_date">
</template>

<script>
export default {
  name: "DateField",
  props: ['value', 'min-date', 'id'],

  data: function () {
    return {};
  },

  watch: {
    value(newValue) {
      $(this.$refs.field_date).data('daterangepicker').setStartDate(newValue);
      $(this.$refs.field_date).data('daterangepicker').setEndDate(newValue);
    }
  },

  mounted: function () {
    //
    $(this.$refs.field_date).daterangepicker({
      singleDatePicker: true,
      autoApply: true,
      showDropdowns: true,
      locale: {
        format: "YYYY-MM-DD",
      },
      startDate: this.value,
    });

    $(this.$refs.field_date).on("apply.daterangepicker", (event, picker) => {
      let date = picker.startDate.format("YYYY-MM-DD");
      this.$emit('input', date);
      this.$emit('changed:date');
    });
  },
  methods: {
    //
  }
}
</script>

<style scoped>
</style>
