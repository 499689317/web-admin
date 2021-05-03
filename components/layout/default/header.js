/**
 * 默认页头布局
 */
import React from 'react';
import Link from 'next/link';
import { Layout, Dropdown, Menu } from 'antd';

class HeaderDefault extends React.Component {
  render() {
    const { pathname } = this.props

    return (
      <Layout.Header className="header">
        <div className="left fold" >
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link href="/">
                    <a>首页</a>
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <img src={`/vercel.svg`} className="logo" />
          </Dropdown>
        </div>

        <style jsx>{`
          :global(.header) {
            display: flex;
            padding: 0 24px;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
            z-index: 1;
          }

          @media screen and (max-width: 480px) {
            .unfold {
              display: none;
            }
            .fold {
              display: inline-block;
            }
          }

          @media screen and (min-width: 480px) {
            .unfold {
              display: inline-block;
            }
            .fold {
              display: none;
            }
          }
        `}</style>
      </Layout.Header>
    )
  }
}

export default HeaderDefault
