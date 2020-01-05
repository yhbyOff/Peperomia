// Code generated by MockGen. DO NOT EDIT.
// Source: item.go

// Package mock_domain is a generated GoMock package.
package mock_domain

import (
	firestore "cloud.google.com/go/firestore"
	context "context"
	gomock "github.com/golang/mock/gomock"
	domain "github.com/wheatandcat/Peperomia/backend/domain"
	reflect "reflect"
)

// MockItemRepository is a mock of ItemRepository interface
type MockItemRepository struct {
	ctrl     *gomock.Controller
	recorder *MockItemRepositoryMockRecorder
}

// MockItemRepositoryMockRecorder is the mock recorder for MockItemRepository
type MockItemRepositoryMockRecorder struct {
	mock *MockItemRepository
}

// NewMockItemRepository creates a new mock instance
func NewMockItemRepository(ctrl *gomock.Controller) *MockItemRepository {
	mock := &MockItemRepository{ctrl: ctrl}
	mock.recorder = &MockItemRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockItemRepository) EXPECT() *MockItemRepositoryMockRecorder {
	return m.recorder
}

// Create mocks base method
func (m *MockItemRepository) Create(ctx context.Context, f *firestore.Client, i domain.ItemRecord) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Create", ctx, f, i)
	ret0, _ := ret[0].(error)
	return ret0
}

// Create indicates an expected call of Create
func (mr *MockItemRepositoryMockRecorder) Create(ctx, f, i interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockItemRepository)(nil).Create), ctx, f, i)
}

// Update mocks base method
func (m *MockItemRepository) Update(ctx context.Context, f *firestore.Client, i domain.ItemRecord) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Update", ctx, f, i)
	ret0, _ := ret[0].(error)
	return ret0
}

// Update indicates an expected call of Update
func (mr *MockItemRepositoryMockRecorder) Update(ctx, f, i interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Update", reflect.TypeOf((*MockItemRepository)(nil).Update), ctx, f, i)
}

// Delete mocks base method
func (m *MockItemRepository) Delete(ctx context.Context, f *firestore.Client, i domain.ItemRecord) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Delete", ctx, f, i)
	ret0, _ := ret[0].(error)
	return ret0
}

// Delete indicates an expected call of Delete
func (mr *MockItemRepositoryMockRecorder) Delete(ctx, f, i interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockItemRepository)(nil).Delete), ctx, f, i)
}

// FindByUID mocks base method
func (m *MockItemRepository) FindByUID(ctx context.Context, f *firestore.Client, uid string) ([]domain.ItemRecord, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByUID", ctx, f, uid)
	ret0, _ := ret[0].([]domain.ItemRecord)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindByUID indicates an expected call of FindByUID
func (mr *MockItemRepositoryMockRecorder) FindByUID(ctx, f, uid interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByUID", reflect.TypeOf((*MockItemRepository)(nil).FindByUID), ctx, f, uid)
}

// DeleteByUID mocks base method
func (m *MockItemRepository) DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteByUID", ctx, f, uid)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteByUID indicates an expected call of DeleteByUID
func (mr *MockItemRepositoryMockRecorder) DeleteByUID(ctx, f, uid interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteByUID", reflect.TypeOf((*MockItemRepository)(nil).DeleteByUID), ctx, f, uid)
}