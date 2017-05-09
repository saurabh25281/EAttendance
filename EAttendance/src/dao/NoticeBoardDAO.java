package dao;

import java.util.List;

import domain.NoticeBoard;

public interface NoticeBoardDAO {
	
	public void saveOrUpdateNotice(NoticeBoard noticeBoard);
	public List<NoticeBoard> listNoticeBoard();
	public NoticeBoard listNoticeBoardById(int notice_id);
	public void deleteNoticeBoard(int notice_id);

}
