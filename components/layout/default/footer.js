/**
 * 默认页脚布局
 */
import React from 'react'

export default function FooterDefault() {
    return (
        <div className="root">
            <a href={`mailto:${process.env.contactEmail}`} target="_blank">联系我们</a>

            <span>Copyright © 2018-2019</span>

            <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
          padding: 24px;
        }
      `}</style>
        </div>
    )
}
