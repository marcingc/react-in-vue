import moment from "moment/moment.js";

export function debounce(fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    let args = arguments
    let that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

export function getPagination(vuetifyPagination, headers = []) {
  const sort = [];

  if (!!vuetifyPagination.sortBy && vuetifyPagination.sortBy.length > 0) {
    for (let i = 0; i < vuetifyPagination.sortBy.length; i++) {
      let sortBy = vuetifyPagination.sortBy[i]
      const sortDesc = !!vuetifyPagination.sortDesc[i]

      if (!!sortBy) {
        const header = headers.find(item => item.value === sortBy)
        if (!!header && !!header.sortKey) {
          sortBy = header.sortKey;
        }
      }

      const orderBy = `${sortBy},${sortDesc ? "DESC" : "ASC"}`;
      sort.push(orderBy);
    }
  }

  return {
    page: vuetifyPagination.page - 1,
    size: vuetifyPagination.itemsPerPage,
    sort: sort,
  }
}

export function handleComboboxInput(property, entry, items) {
  if (typeof entry === 'string' && entry.trim()) {
    const item = items.find(item => item[property] === entry)
    if (!!item) {
      return item
    } else {
      const newItem = {
        id: null,
      }
      newItem[property] = entry;
      items.push(newItem)

      return newItem
    }
  } else {
    return entry;
  }
}

export function getNestedObjectByStringPath(nestedObj, pathArrString) {
  if (!pathArrString) {
    return nestedObj;
  } else if (pathArrString.includes(".")) {
    const path = pathArrString.split(".");
    return getNestedObject(nestedObj, path);
  } else {
    return nestedObj[pathArrString];
  }
}

export function setNestedValueByStringPath(root, value, pathArrString) {
  if (pathArrString.includes(".")) {
    const pathArray = pathArrString.split(".");
    let pop = pathArray.pop();


    let obj = pathArray.reduce(
      (obj, key) => {
        if (obj[key] === undefined) {
          obj[key] = {}
        }

        return obj[key];
      }
    );

    obj[pop] = value;
  } else {
    root[pathArrString] = value;
  }

  return root;
}

export function getNestedObject(nestedObj, pathArr) {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

export function getNumericColumns(arr = []) {
  return arr.filter(el => el.numeric === true).map(el => el.value);
}

export function getGroupByHeaders(arr = []) {
  const clone = JSON.parse(JSON.stringify(arr));
  return clone.map(i => {
    i.divider = false;
    return i;
  })
}

export function formatMinutesDDHHMM(minutes) {
  if (minutes) {
    minutes = Number.parseFloat(minutes);
    let prepand = '';

    if (minutes < 0) {
      prepand = '-'
      minutes = Math.abs(minutes);
    }

    const mm = minutes % 60;
    const dd = Math.floor(minutes / 24 / 60);
    const HH = Math.floor(minutes / 60) - dd * 24;
    return `${prepand}${dd.toString().padStart(2, '0')}:${HH.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`
  } else if (minutes === 0) {
    return '00:00:00';
  } else {
    return '';
  }
}

export function formatSecondsHHMMSS(seconds) {
  if (seconds) {
    seconds = Number.parseFloat(seconds);
    let prepand = '';

    if (seconds < 0) {
      prepand = '-'
      seconds = Math.abs(seconds);
    }

    const HH = Math.floor(seconds / 3600);
    seconds = seconds - HH * 3600;
    const mm = Math.floor(seconds / 60);
    seconds = seconds - mm * 60;
    return `${prepand}${HH.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else if (seconds === 0) {
    return '00:00:00';
  } else {
    return '';
  }
}

export function getSummaryRow(headers, items) {
  const summaryRow = {};
  const numericCols = getNumericColumns(headers);

  items.forEach(item => {

    numericCols.forEach(colValue => {
      const prev = getNestedObjectByStringPath(summaryRow, colValue);
      const toAdd = getNestedObjectByStringPath(item, colValue);

      const prevFloat = Number.parseFloat(prev);
      const toAddFloat = Number.parseFloat(toAdd);

      setNestedValueByStringPath(summaryRow, (prevFloat ? prevFloat : 0) + (toAddFloat ? toAddFloat : 0), colValue)
    })
  })

  if (items.length === 0) {
    numericCols.forEach(colValue => {
      setNestedValueByStringPath(summaryRow, 0, colValue)
    })
  }


  return summaryRow;
}

export function getPreviousMonthStartEnd() {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const start = new Date(date.valueOf())
  start.setMonth(start.getMonth() - 1)
  start.setDate(1);

  const end = new Date(date.valueOf())
  end.setDate(1);

  return [start, end]
}

export function handleTableRowDoubleClick(event, data, refs) {
  if (!!refs) {
    const menuRef = refs[`menu-dialog-${data.item.id}`];
    if (!!menuRef && !!menuRef.getActivator) {
      menuRef.getActivator().click();
    } else if (!!menuRef) {
      //for production plan where menu is component
      menuRef.$children[0].getActivator().click();
      refs = menuRef.$refs;
    }

    let dialogRef = refs[`dialog-${data.item.id}`];

    if (!!dialogRef) {
      dialogRef.dialog = true;
    } else {

      //Render ref
      setTimeout(() => {
        dialogRef = refs[`dialog-${data.item.id}`];

        if (!!dialogRef) {
          dialogRef.dialog = true;
        }
      }, 10)
    }

  }
}

export function handleTableRowRightClick(event, data, selected = []) {
  event.preventDefault();

  if (data.isSelected) {
    if (selected && selected.indexOf) {
      const indexOf = selected.indexOf(data.item);
      selected.splice(indexOf, 1);
    }
  } else {
    data.select();
  }
}

export function numberWithSpaces(x, precision = 2) {
  if (x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (parts[1]) {
      parts[1] = parts[1].substring(0, precision)
    }

    return parts.join(".");
  } else {
    return x;
  }
}

export function stringifyBoolean(bool) {
  if (bool === false) {
    return 'Nie'
  } else if (bool === true) {
    return 'Tak';
  } else {
    return '';
  }
}

export function formatDateWithoutTime(date) {
  if (date) {
    return moment(String(date)).format('YYYY-MM-DD')
  } else {
    return date;
  }
}


