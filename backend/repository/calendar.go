package repository

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
)

// CalendarRepository is repository for calendars
type CalendarRepository struct {
}

// CalendarRecord is Calendar data
type CalendarRecord struct {
	ID     string     `json:"id" firestore:"id" binding:"required"`
	UID    string     `json:"uid" firestore:"uid"`
	ItemID string     `json:"itemId" firestore:"itemId" binding:"required"`
	Date   *time.Time `json:"date" firestore:"date" binding:"required"`
}

// NewCalendarRepository is Create new CalendarRepository
func NewCalendarRepository() *CalendarRepository {
	return &CalendarRepository{}
}

func getCalendarDocID(uID string, itemID string, calendarID string) string {

	doc := uID + "_" + calendarID + "_" + itemID
	return doc
}

// Create カレンダーを作成する
func (re *CalendarRepository) Create(ctx context.Context, f *firestore.Client, i CalendarRecord) error {
	idDoc := getCalendarDocID(i.UID, i.ItemID, i.ID)

	_, err := f.Collection("calendars").Doc(idDoc).Set(ctx, i)

	return err
}

// DeleteByUID ユーザーIDから削除する
func (re *CalendarRepository) DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error {
	matchItem := f.Collection("calendars").Where("uid", "==", uid).Documents(ctx)
	docs, err := matchItem.GetAll()
	if err != nil {
		return err
	}

	for _, doc := range docs {
		if _, err := doc.Ref.Delete(ctx); err != nil {
			return err
		}
	}

	return nil
}
