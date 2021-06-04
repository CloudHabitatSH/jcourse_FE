import ReviewActionButton from '@/components/review-action-button';
import config from '@/config';
import { Review } from '@/models';
import { Alert, List, Space } from 'antd';
import axios from 'axios';
import { Link } from 'umi';
const ReviewList = ({
  count,
  reviews,
  onPageChange,
  loading,
}: {
  count: number;
  reviews: Review[];
  onPageChange: Function;
  loading: boolean;
}) => {
  const onAction = (review_id: number, action: number) => {
    axios.post(`/api/review/${review_id}/action/`, { action: action });
  };
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      pagination={{
        showSizeChanger: false,
        pageSize: config.PAGE_SIZE,
        hideOnSinglePage: true,
        onChange: (page, pageSize) => {
          onPageChange(page, pageSize);
        },
        total: count,
      }}
      dataSource={reviews}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <div>{item.created}</div>,
            <ReviewActionButton
              onAction={onAction}
              actionProps={{
                id: item.id,
                ...item.actions,
              }}
            />,
          ]}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {item.moderator_remark && (
              <Alert message={item.moderator_remark} type="warning" showIcon />
            )}

            {item.course && (
              <Link to={'/course/' + item.course.id}>
                {item.course.code} {item.course.name}（{item.course.teacher}）
              </Link>
            )}

            <div>
              <strong>推荐指数：</strong>
              {item.rating} <strong> 学期：</strong>
              {item.semester}
              {item.score && (
                <>
                  <strong> 成绩：</strong>
                  {item.score}
                </>
              )}
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{item.comment}</div>
          </Space>
        </List.Item>
      )}
    />
  );
};
export default ReviewList;
