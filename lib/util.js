import Router from 'next/router'

export function compareVersion(v1, v2, len = 3) {
    v1 = (v1 + '.0.0').split('.').map(v => parseInt(v))
    v2 = (v2 + '.0.0').split('.').map(v => parseInt(v))
    for (let i = 0; i < Math.min(len, 3); i++) {
        if (v1[i] > v2[i]) {
            return 1
        } else if (v1[i] < v2[i]) {
            return -1
        }
    }
    return 0
}
export function onPageChange(page, pageSize) {
    Router.push({
        pathname: Router.pathname,
        query: Object.assign({ ...Router.query }, {
            offset: (page - 1) * pageSize,
        }),
    })
}

export function onTableChange(pagination, filters, sorter) {
    const tableChange = {};
    tableChange.current = pagination.current;
    for (const key in filters) {
        if (filters[key]) {
            tableChange[key] = filters[key][0];
        }
    }
    if (sorter.field) {
        tableChange.sortKey = sorter.field;
        tableChange.sortOrder = sorter.order || '';
    }
    return tableChange;
}
