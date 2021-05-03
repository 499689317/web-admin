import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Input } from 'antd'

class EditComponent extends React.Component {
    state = {}

    static async getInitialProps({ req, query, store }) {
        return {}
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                数据详情
            </div>
        )
    }
}

export default connect(({ account }) => {
    return { account }
})(EditComponent)