/* Automatically generated by './build/bin/build-entry.js' */

import Input from '../packages/input/index.js';
import Button from '../packages/button/index.js';
import Addr from '../packages/addr/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import DatePicker from '../packages/date-picker/index.js';
import Dialog from '../packages/dialog/index.js';
import Radio from '../packages/radio/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import Select from '../packages/select/index.js';
import Table from '../packages/table/index.js';
import TableLr from '../packages/table-lr/index.js';
import Upload from '../packages/upload/index.js';
import Pagination from '../packages/pagination/index.js';

const components = [
  Input,
  Button,
  Addr,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableLr,
  Upload,
  Pagination
];

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // Vue.use(Loading.directive);

  // Vue.prototype.$ELEMENT = {
  //   size: opts.size || '',
  //   zIndex: opts.zIndex || 2000
  // };

  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = MessageBox;
  // Vue.prototype.$alert = MessageBox.alert;
  // Vue.prototype.$confirm = MessageBox.confirm;
  // Vue.prototype.$prompt = MessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  // Vue.prototype.$message = Message;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.9.74',
  install,
  Input,
  Button,
  Addr,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableLr,
  Upload,
  Pagination
};
