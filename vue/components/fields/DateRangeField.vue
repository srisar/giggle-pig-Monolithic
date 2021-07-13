<template>
  <input type="text" class="form-control date_range_field" ref="field_date_range">
</template>

<script>
export default {
  name: "DateRangeField",
  props: ['value', 'min-date', 'id'],
  data: function () {
    return {};
  },
  mounted: function () {
    //
    $(this.$refs.field_date_range).daterangepicker({
      "singleDatePicker": false,
      "showDropdowns": true,
      "locale": {
        "format": "YYYY-MM-DD"
      },
      "startDate": this.value.startDate,
      "endDate": this.value.endDate,
      "minDate": this.minDate,
    });


    $(this.$refs.field_date_range).on("apply.daterangepicker", (event, picker) => {
      let sDate = picker.startDate.format("YYYY-MM-DD");
      let eDate = picker.endDate.format("YYYY-MM-DD");
      this.$emit('input', {startDate: sDate, endDate: eDate});
      this.$emit('changed:date-range');
    });

  },
  methods: {
    //
  }
}
</script>

<style scoped>

</style>
