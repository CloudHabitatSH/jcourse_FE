import AnnouncementList from "@/components/announcement-list";
import { useAnnouncements } from "@/services/announcement";
import { Layout, Space } from "antd";

import React from "react";
import Link from "next/link";
import NavBar from "@/components/navbar";

const { Header, Content, Footer } = Layout;

export const BasicLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const { announcements } = useAnnouncements();

  return (
    <Layout className="basic-layout">
      <Header className="header">
        <NavBar />
      </Header>

      <Content className="content">
        {announcements && announcements.length > 0 && (
          <AnnouncementList announcements={announcements} />
        )}
        {children}
      </Content>
      <Footer className="footer">
        <Space>
          <Link href="/about">关于</Link>
          <Link href="/faq">常见问题</Link>
          <Link href="/report">反馈</Link>
        </Space>
        <div>©2022 SJTU选课社区</div>
      </Footer>
    </Layout>
  );
};

export const LoginLayout = ({ children }: React.PropsWithChildren<{}>) => (
  <Layout className="login-layout">
    <Header className="header">
      <div className="title">SJTU选课社区</div>
    </Header>
    <Content className="content">{children}</Content>
  </Layout>
);
