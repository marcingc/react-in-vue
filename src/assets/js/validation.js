export const rules = {
  required: value => !!value || value === 0  || $nuxt.$t('validation_required'),
  maxLength255: value => !value || value?.length === 0 || value?.length <= 255 || $nuxt.$t('validation_max_length_255'),
  email: value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || $nuxt.$t('validation_invalid_email'),
  min0: value => value >= 0 || $nuxt.$t('validation_min_value_0'),
  min: (value, v) => value >= v || `${$nuxt.$t('validation_min_value')} ${v}`,
  max: (value, v) => value <= v || `${$nuxt.$t('validation_max_value')} ${v}`,
  biggerThan: (value, v) => value > v || `${$nuxt.$t('validation_bigger_than')} ${v}`,
  min0Price: value => !value || !(value + '').includes('-') || $nuxt.$t('validation_min_value_0'),
  integer: value => !value || /(^$|^\d+$)/.test(value) || $nuxt.$t('validation_only_integers'),
  multiselectRequired: value =>  value.length>0 || $nuxt.$t('validation_required'),
  requiredTrim: value => {
    if (value && value.trim().length > 0) {
      return;
    } else {
      return $nuxt.$t('validation_required');
    }
  },
  sumMax: (value, v) => {
    if (value <= v) {
      return;
    } else {
      return `${$nuxt.$t('validation_max_sum_value')} ${v}`;
    }
  },
}
