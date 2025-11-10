'use client'

import { useEffect } from 'react'

export default function DailyCauseList507Page() {
  useEffect(() => {
    // Set title immediately when component mounts
    document.title = 'dailycauselist507'
    
    // Keep title set even if something tries to change it
    const interval = setInterval(() => {
      if (document.title !== 'dailycauselist507') {
        document.title = 'dailycauselist507'
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div dangerouslySetInnerHTML={{ __html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>dailycauselist507</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<style>
  /* Reset and base styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, 'Helvetica', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
  }
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  /* Header styles */
  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    gap: 15px;
  }
  header h1 {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: #2c3e50;
    text-align: left;
  }
  header h1 i {
    margin-right: 10px;
    color: #3498db;
  }
  .header-actions {
    display: flex;
    align-items: center;
  }
  .search-bar {
    position: relative;
    margin-right: 60px;
  }
  .search-bar input {
    padding: 8px 15px 8px 35px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 785px;
    font-size: 14px;
  }
  .search-bar i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
  }
  
  /* Button styles */
  .btn {
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: none;
  }
  .btn i {
    margin-right: 8px;
  }
  #home-btn {
    margin-right: 15px;
  }
  #refresh-btn {
    margin-left: 405px;
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    color: #0b1020;
    font-weight: 600;
  }
  #refresh-btn:hover {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  #clear-filters-btn {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    color: #0b1020;
    font-weight: 600;
  }
  #clear-filters-btn:hover {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  .btn-primary {
    background-color: #3498db;
    color: white;
  }
  .btn-primary:hover {
    background-color: #2980b9;
  }
  .clear-filters-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #2196f3;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .clear-filters-btn:hover {
    background-color: #1976d2;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  .btn-secondary {
    background-color: #95a5a6;
    color: white;
  }
  .btn-secondary:hover {
    background-color: #7f8c8d;
  }
  #signout-btn {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    color: #0b1020;
    font-weight: 600;
    margin-left: 15px;
  }
  #signout-btn:hover {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  .profile-dropdown-container {
    position: relative;
   margin-left: 650px;
  }
  .profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    color: #0b1020;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }
  .profile-icon:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  .profile-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    z-index: 1000;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: none;
    animation: dropdownFadeIn 0.2s ease;
  }
  .profile-dropdown.show {
    display: block;
  }
  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .dropdown-item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #1a202c;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  .dropdown-item:hover {
    background-color: #f5f7fa;
  }
  .dropdown-item:active {
    background-color: #e2e8f0;
  }
  .dropdown-divider {
    height: 1px;
    background-color: #e2e8f0;
    margin: 4px 0;
  }
  .btn-success {
    background-color: #2ecc71;
    color: white;
  }
  .btn-success:hover {
    background-color: #27ae60;
  }
  .btn-danger {
    background-color: #e74c3c;
    color: white;
  }
  .btn-danger:hover {
    background-color: #c0392b;
  }
  .btn-warning {
    background-color: #f39c12;
    color: white;
  }
  .btn-warning:hover {
    background-color: #d35400;
  }
  .btn-sm {
    padding: 4px 10px;
    font-size: 12px;
  }
  
  /* Date range navigation */
  .date-range-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    flex-wrap: wrap;
    gap: 15px;
  }
  .date-range-inputs {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .date-range-inputs label {
    font-weight: bold;
    color: #2c3e50;
  }
  .date-range-inputs input[type="date"] {
    padding: 8px 12px;
    border: 2px solid #3498db;
    border-radius: 5px;
    font-size: 14px;
    background-color: white;
    color: #2c3e50;
    font-weight: bold;
  }
  .date-range-info {
    font-size: 16px;
    font-weight: bold;
    color: #2c3e50;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .date-range-info i {
    margin-right: 1px;
    color: #3498db;
  }
  .case-count {
    background-color: #3498db;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 14px;
  }
  .range-shortcuts {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
  
  /* Filters section */
  .filters-container {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
  }
  .filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 10px;
  }
  .filter-item {
    min-width: 200px;
  }
  .filter-item select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ced4da;
  }
  /* Highlight selected filters */
  .filter-item select:not([value=""]) {
    border: 2px solid #3498db;
    background-color: #e3f2fd;
  }
  .filter-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  /* Active filters display */
  .active-filters {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
  #active-filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    flex: 1;
    min-width: 0;
  }
  .active-filter-tag {
    background-color: #3498db;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .active-filter-tag .remove-filter {
    margin-left: 5px;
    cursor: pointer;
    background: none;
    border: none;
    color: white;
    font-size: 14px;
  }
  .filter-results-count {
    font-weight: bold;
    color: #2c3e50;
    background-color: #ecf0f1;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  /* Cases Container - stable height to prevent layout shifts */
  #case-container {
    min-height: 400px;
    transition: min-height 0.3s ease;
    position: relative;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  /* Table styling */
  .table-responsive {
    overflow-x: auto;
    min-height: 300px;
    margin-bottom: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-radius: 5px;
    margin-bottom: 0;
  }
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: top; /* This makes ALL cells top-aligned */
  }
  th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #2c3e50;
    position: sticky;
    top: 0;
  }
  tr:hover {
    background-color: #f5f7fa;
  }
  
  /* Priority styling */
  .priority-High {
    color: #e74c3c;
    font-weight: bold;
  }
  .priority-Medium {
    color: #f39c12;
    font-weight: bold;
  }
  .priority-Low {
    color: #2ecc71;
    font-weight: bold;
  }
  
  /* Priority Buttons */
  .priority-buttons {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
  }
  .btn-outline-danger, .btn-outline-warning, .btn-outline-success, .btn-outline-secondary {
    background-color: transparent;
  }
  .btn-outline-danger {
    border: 1px solid #e74c3c;
    color: #e74c3c;
  }
  .btn-outline-warning {
    border: 1px solid #f39c12;
    color: #f39c12;
  }
  .btn-outline-success {
    border: 1px solid #2ecc71;
    color: #2ecc71;
  }
  .btn-outline-secondary {
    border: 1px solid #95a5a6;
    color: #95a5a6;
  }
  
  /* Status styling */
  .status-Completed {
    color: #2ecc71;
    font-weight: bold;
    background-color: rgba(46, 204, 113, 0.1);
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid rgba(46, 204, 113, 0.2);
  }
  .status-In-progress {
    color: #f39c12;
    font-weight: bold;
    background-color: rgba(243, 156, 18, 0.1);
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid rgba(243, 156, 18, 0.2);
  }
  .status-Pending {
    color: #e74c3c;
    font-weight: bold;
    background-color: rgba(231, 76, 60, 0.1);
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid rgba(231, 76, 60, 0.2);
  }
  
  /* Date highlighting */
  .date-highlight {
    font-weight: bold;
  }
  .date-today {
    color: #e74c3c;
  }
  .date-upcoming {
    color: #f39c12;
  }
  
  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  .empty-state i {
    font-size: 48px;
    color: #95a5a6;
    margin-bottom: 20px;
  }
  .empty-state h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  /* Filters heading specific styling */
  .filters-container h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  .empty-state p {
    color: #7f8c8d;
    margin-bottom: 20px;
  }
  
  /* Loading overlay */
  .loading-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    padding: 40px 20px;
  }
  .loading-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 36px 48px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
    text-align: center;
    max-width: 420px;
    width: 100%;
  }
  .loading-card h3 {
    margin: 16px 0 8px;
    font-size: 18px;
    color: #2c3e50;
    font-weight: 600;
  }
  .loading-card p {
    margin: 4px 0;
    color: #4a5a70;
    font-size: 14px;
    line-height: 1.6;
  }
  .loading-card #loading-progress {
    font-weight: 600;
    color: #2563eb;
  }
  .loading-card #loading-status {
    font-size: 13px;
    color: #6b7280;
  }
  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Serial number column */
  .serial-column {
    width: 50px;
    text-align: center;
    font-weight: bold;
  }
  
  /* Modal styles */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow: auto;
  }
  .modal-content {
    background-color: white;
    margin: 50px auto;
    padding: 0;
    width: 80%;
    max-width: 800px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    animation: modalFadeIn 0.3s;
    max-height: 90vh;
    overflow-y: auto;
    /* Prevent modal from jumping to top */
    position: relative;
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 8px 8px 0 0;
  }
  .modal-header h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    display: flex;
    align-items: center;
  }
  .modal-header h2 i {
    margin-right: 10px;
    color: #3498db;
  }
  .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #95a5a6;
  }
  .modal-body {
    padding: 20px;
  }
  
  /* Prayer content styling */
  .prayer-content {
    background-color: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    max-height: 400px;
    overflow-y: auto;
  }
  
  /* Form styles */
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 15px;
  }
  .form-group {
    flex: 1;
    min-width: 200px;
    margin-bottom: 15px;
  }
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: normal;
    color: #2c3e50;
  }
  .form-control {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  .form-control-textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  /* Editable synopsis field */
  .synopsis-editable {
    cursor: pointer;
    min-height: 20px;
    padding: 5px;
    border: 1px solid transparent;
  }
  .synopsis-editable:hover {
    border: 1px solid #ddd;
    background-color: #f8f9fa;
  }
  .synopsis-editable:focus {
    outline: none;
    border: 1px solid #3498db;
    background-color: white;
  }
  
  /* View link styles */
  .view-link {
    display: inline-block;
    margin-left: 10px;
  }
  
  /* Prayer link styles */
  .prayer-link {
    color: #9b59b6;
    text-decoration: none;
    font-size: 12px;
    font-style: italic;
    cursor: pointer;
  }
  .prayer-link:hover {
    text-decoration: underline;
  }
  
  /* Notification styles */
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Add missing case button styling */
  .add-missing-case-btn {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    color: #0b1020;
    font-weight: 600;
    margin-left: 10px;
  }
  .add-missing-case-btn:hover {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  /* Confirmation dialog styling */
  .confirmation-dialog {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 5px;
    padding: 15px;
    margin: 15px 0;
  }
  .confirmation-dialog h4 {
    font-size: 18px;
    font-weight: 600;
    color: #856404;
    margin-bottom: 10px;
  }
  .confirmation-dialog p {
    color: #856404;
    margin-bottom: 15px;
  }
  
  /* Home button styling */
  .home-btn {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    color: #0b1020;
    font-weight: 600;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin-right: 15px;
  }
  .home-btn:hover {
    background: linear-gradient(135deg, #6aa6ff, #7ad1ff);
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  .home-btn svg {
    width: 20px;
    height: 20px;
  }

  /* Pagination styles - minimalist design with improved UX */
  .pagination-container {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
    z-index: 100;
    margin: 0;
    margin-top: 4px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  .pagination-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 16px;
  }
  
  .pagination-info-left {
    font-size: 14px;
    color: #2c3e50;
    font-weight: 400;
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
    flex: 1;
  }
  
  /* Active page - blue circular button */
  .pagination-btn-active {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: default;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: 0 2px 4px rgba(52, 152, 219, 0.3);
    transition: box-shadow 0.2s ease;
  }
  
  /* Inactive page numbers and navigation - plain text links */
  .pagination-link,
  button.pagination-link,
  .pagination-controls button.pagination-link {
    background: none;
    border: none;
    color: #2c3e50;
    cursor: pointer !important;
    font-size: 14px;
    font-weight: 400;
    padding: 6px 8px;
    text-decoration: none;
    transition: all 0.2s ease;
    border-radius: 4px;
    min-width: 28px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  .pagination-link:hover,
  button.pagination-link:hover,
  .pagination-controls button.pagination-link:hover {
    color: #3498db;
    background-color: rgba(52, 152, 219, 0.08);
    transform: translateY(-1px);
    cursor: pointer !important;
  }
  
  .pagination-link:active,
  button.pagination-link:active,
  .pagination-controls button.pagination-link:active {
    color: #2980b9;
    background-color: rgba(52, 152, 219, 0.12);
    transform: translateY(0);
    cursor: pointer !important;
  }
  
  .pagination-link:focus,
  button.pagination-link:focus,
  .pagination-controls button.pagination-link:focus {
    outline: 2px solid rgba(52, 152, 219, 0.3);
    outline-offset: 2px;
    cursor: pointer !important;
  }
  
  .pagination-link:disabled,
  button.pagination-link:disabled,
  .pagination-controls button.pagination-link:disabled {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    .pagination-container {
      padding: 12px 16px;
    }
    
    .pagination-inner {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
    
    .pagination-info-left {
      font-size: 13px;
      width: 100%;
      text-align: left;
    }
    
    .pagination-controls {
      width: 100%;
      justify-content: flex-start;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .pagination-btn-active {
      width: 32px;
      height: 32px;
      font-size: 13px;
    }
    
    .pagination-link,
    button.pagination-link,
    .pagination-controls button.pagination-link {
      font-size: 13px;
      padding: 5px 7px;
      min-width: 26px;
      cursor: pointer !important;
    }
    
    .pagination-link:hover,
    button.pagination-link:hover,
    .pagination-controls button.pagination-link:hover {
      cursor: pointer !important;
    }
    
    .pagination-link:active,
    button.pagination-link:active,
    .pagination-controls button.pagination-link:active {
      cursor: pointer !important;
    }
    
    .pagination-link:focus,
    button.pagination-link:focus,
    .pagination-controls button.pagination-link:focus {
      cursor: pointer !important;
    }
  }

  /* Lazy loading placeholder */
  .lazy-load-placeholder {
    height: 50px;
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7f8c8d;
    font-style: italic;
  }
</style>
</head>
<body>
<div class="container">
  <header>
    <div style="display: flex; align-items: center;">
      <button class="home-btn" id="home-btn" title="Home">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>
      <h1><i class="fas fa-balance-scale"></i>Legal Command Centre (Powered by Valuepitch)</h1>
      <div class="profile-dropdown-container" id="profile-dropdown-container" style="display: none;">
        <div class="profile-icon" id="profile-icon">U</div>
        <div class="profile-dropdown" id="profile-dropdown">
          <div class="dropdown-item" id="my-account-item">
            <i class="fas fa-user" style="margin-right: 8px;"></i>
            My Account
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item" id="signout-item">
            <i class="fas fa-sign-out-alt" style="margin-right: 8px;"></i>
            Sign Out
          </div>
        </div>
      </div>
    </div>
    <div class="header-actions">
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="Search cases, parties, CNR...">
        <i class="fas fa-search"></i>
      </div>
      <button class="btn btn-primary" id="refresh-btn">
        <i class="fas fa-sync-alt"></i> Refresh
      </button>
      <button class="btn add-missing-case-btn" id="add-missing-case-btn" style="display: none;">
        <i class="fas fa-plus-circle"></i> Add Missing Case
      </button>
    </div>
  </header>

  <!-- Date Range Navigation -->
  <div class="date-range-nav">
    <div class="date-range-inputs">
      <label for="start-date">From:</label>
      <input type="date" id="start-date" />
      <label for="end-date">To:</label>
      <input type="date" id="end-date" />
      <button class="btn btn-primary" id="apply-range-btn">
        <i class="fas fa-search"></i> Apply Range
      </button>
    </div>
    
    <div class="range-shortcuts">
      <button class="btn btn-secondary btn-sm" id="today-btn">
        <i class="fas fa-calendar-day"></i> Today
      </button>
      <button class="btn btn-secondary btn-sm" id="yesterday-btn">
        <i class="fas fa-calendar-minus"></i> Yesterday
      </button>
      <button class="btn btn-secondary btn-sm" id="this-week-btn">
        <i class="fas fa-calendar-week"></i> This Week
      </button>
      <button class="btn btn-secondary btn-sm" id="last-week-btn">
        <i class="fas fa-calendar-alt"></i> Last Week
      </button>
      <button class="btn btn-secondary btn-sm" id="this-month-btn">
        <i class="fas fa-calendar"></i> This Month
      </button>
    </div>
    
    <div class="date-range-info">
      <i class="fas fa-calendar-alt"></i>
      <span id="selected-range-display">Select date range</span>
      <span id="case-count" class="case-count">0 cases</span>
    </div>
  </div>

  <!-- Filters Section -->
  <div class="filters-container">
    <h3><i class="fas fa-filter"></i> Filters</h3>
    
    <!-- Active filters display -->
    <div id="active-filters" class="active-filters" style="display: none;">
      <span>Active Filters:</span>
      <div id="filter-results-count" class="filter-results-count"></div>
      <div id="active-filter-tags"></div>
    
    </div>
    
    <div class="filter-group">
      <div class="filter-item">
        <div class="filter-title">Priority</div>
        <select id="priority-filter">
          <option value="">All Priorities</option>
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Case Age</div>
        <select id="case-age-filter">
          <option value="">All Cases</option>
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Case Categories</div>
        <select id="case-category-filter">
          <option value="">All Categories</option>
          <!-- Options will be populated dynamically with counts -->
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Case Type</div>
        <select id="case-type-filter">
          <option value="">All Types</option>
          <!-- Options will be populated dynamically with counts -->
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Case Stage</div>
        <select id="case-stage-filter">
          <option value="">All Stages</option>
          <!-- Options will be populated dynamically with counts -->
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Match Keyword</div>
        <select id="match-keyword-filter">
          <option value="">All Keywords</option>
          <!-- Options will be populated dynamically with counts -->
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Court Number</div>
        <select id="court-no-filter">
          <option value="">All Courts</option>
          <!-- Options will be populated dynamically with counts -->
        </select>
      </div>
      
      <div class="filter-item">
        <div class="filter-title">Cause List</div>
        <select id="cause-list-filter">
          <option value="">All Cause Lists</option>
          <!-- Options will be populated dynamically with counts -->
        </select>
      </div>
    </div>
    
    <button class="btn btn-primary" id="clear-filters-btn">
      <i class="fas fa-times-circle"></i> Clear Filters
    </button>
  </div>

  <!-- Cases Container -->
  <div id="case-container"></div>

  <!-- Prayer Modal -->
  <div id="prayer-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2><i class="fas fa-pray"></i> Case Prayer</h2>
        <button class="modal-close" onclick="closeModal('prayer-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div id="prayer-content" class="prayer-content">
          <!-- Prayer content will be loaded here -->
        </div>
      </div>
    </div>
  </div>

  <!-- Alert Modal -->
  <div id="alert-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2><i class="fas fa-bell"></i> Send Alert</h2>
        <button class="modal-close" onclick="closeModal('alert-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="alert-to-select">Alert To</label>
          <select id="alert-to-select" class="form-control">
            <option value="">Select Department</option>
            <option value="SP, Srikakulam">SP, Srikakulam</option>
            <option value="SP, Vizianagaram">SP, Vizianagaram</option>
            <option value="SP, Parvathipuram Manyam">SP, Parvathipuram Manyam</option>
            <option value="SP, Anakapalli">SP, Anakapalli</option>
            <option value="SP, Alluri Sitharamaraju">SP, Alluri Sitharamaraju</option>
            <option value="SP, East Godavari">SP, East Godavari</option>
            <option value="SP, Kakinada">SP, Kakinada</option>
            <option value="SP, Konaseema">SP, Konaseema</option>
            <option value="SP, Eluru">SP, Eluru</option>
            <option value="SP, West Godavari">SP, West Godavari</option>
            <option value="SP, Krishna">SP, Krishna</option>
            <option value="SP, Guntur">SP, Guntur</option>
            <option value="SP, Palnadu">SP, Palnadu</option>
            <option value="SP, Prakasam">SP, Prakasam</option>
            <option value="SP, Bapatla">SP, Bapatla</option>
            <option value="SP, Nellore">SP, Nellore</option>
            <option value="SP, Kadapa">SP, Kadapa</option>
            <option value="SP, Kurnool">SP, Kurnool</option>
            <option value="SP, Nandyal">SP, Nandyal</option>
            <option value="SP, Ananthapuram">SP, Ananthapuram</option>
            <option value="SP, Chittoor">SP, Chittoor</option>
            <option value="SP, Tirupathi">SP, Tirupathi</option>
            <option value="SP, Annamayya">SP, Annamayya</option>
            <option value="SP, Sri Satya Sai">SP, Sri Satya Sai</option>
            <option value="Commandant, SAR CPL">Commandant, SAR CPL</option>
            <option value="DIG, Visakhapatnam Range">DIG, Visakhapatnam Range</option>
            <option value="IG, Eluru Range">IG, Eluru Range</option>
            <option value="IG, Guntur Range">IG, Guntur Range</option>
            <option value="DIG, Kurnool Range">DIG, Kurnool Range</option>
            <option value="DIG, Ananthapuram Range">DIG, Ananthapuram Range</option>
            <option value="PTC, Ananthapuram">PTC, Ananthapuram</option>
            <option value="PTC, Ongole">PTC, Ongole</option>
            <option value="PTC, Tirupati">PTC, Tirupati</option>
            <option value="PTC, Vizianagaram">PTC, Vizianagaram</option>
            <option value="SP, PTO">SP, PTO</option>
            <option value="IG, Coastal Security">IG, Coastal Security</option>
            <option value="SP, GRP Gunthakal">SP, GRP Gunthakal</option>
            <option value="SP, GRP Vijayawada">SP, GRP Vijayawada</option>
            <option value="IG, Provision & Logistics">IG, Provision & Logistics</option>
            <option value="IG, Personnel">IG, Personnel</option>
            <option value="IG, Training">IG, Training</option>
            <option value="IG, Sports">IG, Sports</option>
            <option value="IG, EAGLE">IG, EAGLE</option>
            <option value="IG, Home Guards">IG, Home Guards</option>
            <option value="IG, Railways">IG, Railways</option>
            <option value="JD, Accounts, DGP Office">JD, Accounts, DGP Office</option>
            <option value="DIG, Communication">DIG, Communication</option>
            <option value="IG, Technical Services">IG, Technical Services</option>
            <option value="SP, Red Sandal Task Force">SP, Red Sandal Task Force</option>
            <option value="CP, Visakhapatnam City">CP, Visakhapatnam City</option>
            <option value="CP, NTR City">CP, NTR City</option>
            <option value="ADGP, APSP Battalions">ADGP, APSP Battalions</option>
            <option value="ADGP, Operations">ADGP, Operations</option>
            <option value="ADGP, Intelligence">ADGP, Intelligence</option>
            <option value="DGP, CID">DGP, CID</option>
            <option value="Director, Police Academy">Director, Police Academy</option>
            <option value="Director, FSL">Director, FSL</option>
            <option value="Chairman, SLPRB">Chairman, SLPRB</option>
            <option value="Chief Vigilance Officer, TTD">Chief Vigilance Officer, TTD</option>
            <option value="DGP, ACB">DGP, ACB</option>
          </select>
        </div>
        
        <button class="btn btn-primary" onclick="sendAlert()">
          <i class="fas fa-paper-plane"></i> Send Alert
        </button>
      </div>
    </div>
  </div>

  <!-- Missing Case Modal -->
  <div id="missing-case-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2><i class="fas fa-plus-circle"></i> Add Missing Case</h2>
        <button class="modal-close" onclick="closeModal('missing-case-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <form id="missing-case-form">
          <div class="form-row">
            <div class="form-group">
              <label for="missing-main-number">Main Number *</label>
              <input type="text" id="missing-main-number" class="form-control" required placeholder="Enter main number">
            </div>
            <div class="form-group">
              <label for="missing-court-number">Court Number *</label>
              <select id="missing-court-number" class="form-control" required>
                <option value="">Select Court Number</option>
                <option value="COURT NO. 1">COURT NO. 1</option>
                <option value="COURT NO. 2">COURT NO. 2</option>
                <option value="COURT NO. 3">COURT NO. 3</option>
               <option value="COURT NO. 4">COURT NO. 4</option>
               <option value="COURT NO. 5">COURT NO. 5</option>
               <option value="COURT NO. 6">COURT NO. 6</option>
              <option value="COURT NO. 7">COURT NO. 7</option>
              <option value="COURT NO. 8">COURT NO. 8</option>
              <option value="COURT NO. 9">COURT NO. 9</option>
              <option value="COURT NO. 10">COURT NO. 10</option>
              <option value="COURT NO. 11">COURT NO. 11</option>
              <option value="COURT NO. 12">COURT NO. 12</option>
              <option value="COURT NO. 13">COURT NO. 13</option>
              <option value="COURT NO. 14">COURT NO. 14</option>
              <option value="COURT NO. 15">COURT NO. 15</option>
              <option value="COURT NO. 16">COURT NO. 16</option>
              <option value="COURT NO. 17">COURT NO. 17</option>
              <option value="COURT NO. 18">COURT NO. 18</option>
              <option value="COURT NO. 19">COURT NO. 19</option>
              <option value="COURT NO. 20">COURT NO. 20</option>
              <option value="COURT NO. 21">COURT NO. 21</option>
             <option value="COURT NO. 22">COURT NO. 22</option>
             <option value="COURT NO. 23">COURT NO. 23</option>
             <option value="COURT NO. 24">COURT NO. 24</option>
             <option value="COURT NO. 25">COURT NO. 25</option>
             <option value="COURT NO. 26">COURT NO. 26</option>
             <option value="COURT NO. 27">COURT NO. 27</option>
             <option value="COURT NO. 28">COURT NO. 28</option>
             <option value="COURT NO. 29">COURT NO. 29</option>
             <option value="COURT NO. 30">COURT NO. 30</option>
             <option value="COURT NO. 31">COURT NO. 31</option>
             <option value="COURT NO. 32">COURT NO. 32</option>
             <option value="COURT NO. 33">COURT NO. 33</option>
           </select>
         </div>
       </div>
       
       <div class="form-group">
         <label for="missing-cause-list-date">Cause List Date *</label>
         <input type="date" id="missing-cause-list-date" class="form-control" required>
       </div>
       
       <div class="form-group">
         <label for="missing-additional-context">Additional Context</label>
         <textarea id="missing-additional-context" class="form-control form-control-textarea" placeholder="Enter any additional context or information about the missing case..."></textarea>
       </div>

       <div id="confirmation-section" class="confirmation-dialog" style="display: none;">
         <h4><i class="fas fa-question-circle"></i> Confirmation Required</h4>
         <p id="confirmation-text"></p>
         <div>
           <button type="button" class="btn btn-success" onclick="confirmAndSubmitMissingCase()">
             <i class="fas fa-check"></i> Yes, Submit
           </button>
           <button type="button" class="btn btn-secondary" onclick="hideConfirmation()">
             <i class="fas fa-times"></i> Cancel
           </button>
         </div>
       </div>
       
       <button type="submit" class="btn btn-primary" id="submit-missing-case-btn">
         <i class="fas fa-paper-plane"></i> Submit Missing Case
       </button>
     </form>
   </div>
 </div>
</div>
</div>

<script>
// Set title immediately to prevent Next.js from overriding it
(function() {
  document.title = 'dailycauselist507';
  
  // Set title on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      document.title = 'dailycauselist507';
    });
  }
  
  // Ensure title stays set even if it gets changed
  var titleObserver = new MutationObserver(function(mutations) {
    if (document.title !== 'dailycauselist507') {
      document.title = 'dailycauselist507';
    }
  });
  
  // Start observing when document.head is available
  if (document.head) {
    titleObserver.observe(document.head, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (document.head) {
        titleObserver.observe(document.head, {
          childList: true,
          subtree: true
        });
      }
    });
  }
})();

let currentDocname = '';
let allCases = [];
let filteredCases = [];
let currentViewMode = 'table';
let startDate = new Date().toISOString().split('T')[0]; // Default to today
let endDate = new Date().toISOString().split('T')[0]; // Default to today
let availableDates = []; // Will store all available cause list dates

// Tab state management for lazy loading
let activeTab = null; // 'today', 'this-week', 'this-month', or null
let loadedTabs = new Set(); // Track which tabs have been loaded to avoid reloading
let tabDataCache = {}; // Cache data for each tab: { 'today': [...cases], 'this-week': [...cases], etc. }

// Pagination state - server-side pagination
let currentPage = 1;
const recordsPerPage = 10;
let totalFilteredCases = 0;
let totalCasesInRange = 0; // Total cases available for current date range (from server)
let fetchedPages = new Set(); // Track which pages have been fetched: { 1, 2, 3, ... }
let pageDataCache = {}; // Cache data for each page: { 1: [...cases], 2: [...cases], etc. }
let currentDateRange = { start: null, end: null }; // Track current date range for pagination

// Initialize the application
window.onload = function() {
 console.log('Initializing application...');
 document.title = 'dailycauselist507';
 
 // Set up date range navigation
 initializeDateRange();
 
 // Render initial empty state (don't load data yet - wait for tab click)
 renderInitialState();
 
 // Set today's date as default in the missing case form
 document.getElementById('missing-cause-list-date').value = startDate;
 
 // Add event listeners to the filter dropdowns
 document.getElementById('priority-filter').addEventListener('change', function() {
   console.log('Priority filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('case-age-filter').addEventListener('change', function() {
   console.log('Case age filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('case-category-filter').addEventListener('change', function() {
   console.log('Category filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('case-type-filter').addEventListener('change', function() {
   console.log('Case type filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('case-stage-filter').addEventListener('change', function() {
   console.log('Stage filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('match-keyword-filter').addEventListener('change', function() {
   console.log('Keyword filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('court-no-filter').addEventListener('change', function() {
   console.log('Court filter changed to:', this.value);
   applyFilters();
 });
 
 document.getElementById('cause-list-filter').addEventListener('change', function() {
   console.log('Cause list filter changed to:', this.value);
   applyFilters();
 });
 
 // Add event listener for clear filters button
 document.getElementById('clear-filters-btn').addEventListener('click', function() {
   clearFilters();
 });
 
 // Add event listener for add missing case button
 document.getElementById('add-missing-case-btn').addEventListener('click', function() {
   openMissingCaseModal();
 });
 
 // Add event listener for missing case form submission
 document.getElementById('missing-case-form').addEventListener('submit', function(e) {
   e.preventDefault();
   showMissingCaseConfirmation();
 });
 
 // Don't auto-load data - wait for user to click a tab
 // This improves initial page load performance
 // Auto-select 'Today' tab and load its data
 activateTab('today');
};

function initializeDateRange() {
 const startDateInput = document.getElementById('start-date');
 const endDateInput = document.getElementById('end-date');
 const applyRangeBtn = document.getElementById('apply-range-btn');
 const todayBtn = document.getElementById('today-btn');
 const yesterdayBtn = document.getElementById('yesterday-btn');
 const thisWeekBtn = document.getElementById('this-week-btn');
 const lastWeekBtn = document.getElementById('last-week-btn');
 const thisMonthBtn = document.getElementById('this-month-btn');
 
 // Set initial dates
 startDateInput.value = startDate;
 endDateInput.value = endDate;
 updateRangeDisplay();
 
 // Apply range button - custom date selection (not a main tab)
 applyRangeBtn.addEventListener('click', function() {
   const newStartDate = startDateInput.value;
   const newEndDate = endDateInput.value;
   
   if (!newStartDate || !newEndDate) {
     showNotification('Please select both start and end dates', 'error');
     return;
   }
   
   if (newStartDate > newEndDate) {
     showNotification('Start date cannot be after end date', 'error');
     return;
   }
   
   startDate = newStartDate;
   endDate = newEndDate;
   // Clear active tab since this is a custom selection
   activeTab = null;
   updateTabStyles(null);
   updateRangeDisplay();
   currentPage = 1; // Reset to page 1 for new date range
   fetchCasesForDateRange(startDate, endDate, null, 1);
 });
 
 // Today button - use tab activation for lazy loading
 todayBtn.addEventListener('click', function() {
   activateTab('today');
 });
 
 // Yesterday button - custom date selection with highlighting
 yesterdayBtn.addEventListener('click', function() {
   const yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   const yesterdayStr = yesterday.toISOString().split('T')[0];
   // Set active tab to 'yesterday' for highlighting
   activeTab = 'yesterday';
   updateTabStyles('yesterday');
   setDateRange(yesterdayStr, yesterdayStr);
 });
 
 // This week button - use tab activation for lazy loading
 thisWeekBtn.addEventListener('click', function() {
   activateTab('this-week');
 });
 
 // Last week button - custom date selection with highlighting
 lastWeekBtn.addEventListener('click', function() {
   const today = new Date();
   const lastMonday = new Date(today);
   lastMonday.setDate(today.getDate() - today.getDay() - 6);
   const lastSunday = new Date(lastMonday);
   lastSunday.setDate(lastMonday.getDate() + 6);
   // Set active tab to 'last-week' for highlighting
   activeTab = 'last-week';
   updateTabStyles('last-week');
   setDateRange(lastMonday.toISOString().split('T')[0], lastSunday.toISOString().split('T')[0]);
 });
 
 // This month button - use tab activation for lazy loading
 thisMonthBtn.addEventListener('click', function() {
   activateTab('this-month');
 });
}

 function setDateRange(start, end) {
 startDate = start;
 endDate = end;
 document.getElementById('start-date').value = start;
 document.getElementById('end-date').value = end;
 updateRangeDisplay();
 currentPage = 1; // Reset to page 1 for new date range
 fetchCasesForDateRange(startDate, endDate, null, 1);
}

function updateRangeDisplay() {
 const rangeDisplay = document.getElementById('selected-range-display');
 const today = new Date().toISOString().split('T')[0];
 
 if (startDate === endDate) {
   if (startDate === today) {
     rangeDisplay.textContent = \`Today (\${startDate})\`;
   } else {
     rangeDisplay.textContent = \`\${startDate}\`;
   }
 } else {
   rangeDisplay.textContent = \`\${startDate} to \${endDate}\`;
 }
 
 // Update case count - use accurate total from server if available
 const caseCountEl = document.getElementById('case-count');
 if (totalCasesInRange > 0) {
   // Use the accurate total count from server
   caseCountEl.textContent = \`\${totalCasesInRange} cases\`;
 } else {
   // Fallback to loaded cases count
   const casesInRange = allCases.filter(c => c.cause_list_date >= startDate && c.cause_list_date <= endDate);
   caseCountEl.textContent = \`\${casesInRange.length} cases\`;
 }
}

function renderInitialState() {
 console.log('Rendering initial state...');
 const container = document.getElementById('case-container');
 
 // Show message prompting user to select a time period
 container.innerHTML = \`
   <div class="empty-state" style="min-height: 400px;">
     <i class="fas fa-calendar-alt" style="font-size: 48px; color: #3498db; margin-bottom: 20px;"></i>
     <h3>Select a Time Period</h3>
     <p>Click on "Today", "This Week", or "This Month" to load cases for that period.</p>
   </div>
 \`;
}

function renderEmptyLoading() {
 console.log('Rendering loader overlay...');
 const container = document.getElementById('case-container');
 
 container.innerHTML = \`
  <div class="loading-overlay">
    <div class="loading-card">
      <div class="loading-spinner"></div>
      <h3>Fetching the latest cause list</h3>
      <p id="loading-progress">Initializing data pipeline...</p>
      <p id="loading-status">This may take a few seconds.</p>
    </div>
  </div>
 \`;
}

// Update loading progress without re-rendering table
function updateLoadingProgress(current, total, message) {
 const progressEl = document.getElementById('loading-progress');
 const statusEl = document.getElementById('loading-status');
 
 if (progressEl) {
   // User-friendly progress message with blue color
   progressEl.textContent = message || \`Loading cases (\${current} of \${total} loaded...)\`;
   progressEl.style.color = '#3498db';
   progressEl.style.fontWeight = '500';
 }
 if (statusEl && current === total) {
   statusEl.textContent = 'Finalizing data...';
   statusEl.style.color = '#3498db';
   statusEl.style.fontWeight = '500';
 }
}

function inNext7Days(dateStr) {
 if (!dateStr) return false;
 const date = new Date(dateStr);
 const now = new Date();
 const diff = (date - now) / (1000 * 60 * 60 * 24);
 return diff > 0 && diff <= 7;
}

function formatDate(dateStr) {
 if (!dateStr) return '';
 const date = new Date(dateStr);
 const formattedDate = dateStr;
 const today = new Date().toISOString().split('T')[0];
 
 // Add visual indicator for today and upcoming dates
 if (dateStr === today) {
   return \`<span class="date-highlight date-today">\${formattedDate} (Today)</span>\`;
 } else if (inNext7Days(dateStr)) {
   return \`<span class="date-highlight date-upcoming">\${formattedDate}</span>\`;
 }
 
 return formattedDate;
}

// Activate a tab and load its data (lazy loading)
function activateTab(tabName) {
 console.log(\`Activating tab: \${tabName}\`);
 
 // Update active tab
 activeTab = tabName;
 
 // Reset pagination when switching tabs
 currentPage = 1;
 
 // Update tab button styles
 updateTabStyles(tabName);
 
 // Calculate date range based on tab
 let tabStartDate, tabEndDate;
 const today = new Date();
 
 switch(tabName) {
   case 'today':
     tabStartDate = today.toISOString().split('T')[0];
     tabEndDate = today.toISOString().split('T')[0];
     break;
   case 'this-week':
     const monday = new Date(today);
     monday.setDate(today.getDate() - today.getDay() + 1);
     const sunday = new Date(monday);
     sunday.setDate(monday.getDate() + 6);
     tabStartDate = monday.toISOString().split('T')[0];
     tabEndDate = sunday.toISOString().split('T')[0];
     break;
   case 'this-month':
     const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
     tabStartDate = firstDay.toISOString().split('T')[0];
     tabEndDate = lastDay.toISOString().split('T')[0];
     break;
   default:
     console.error('Unknown tab:', tabName);
     return;
 }
 
 // Update global date range
 startDate = tabStartDate;
 endDate = tabEndDate;
 
 // Update date inputs
 document.getElementById('start-date').value = tabStartDate;
 document.getElementById('end-date').value = tabEndDate;
 
 // Only fetch if this tab hasn't been loaded yet (optimization)
 if (!loadedTabs.has(tabName)) {
   console.log(\`Loading data for tab: \${tabName} (dates: \${tabStartDate} to \${tabEndDate})\`);
   loadedTabs.add(tabName);
   currentPage = 1; // Reset to page 1 for new tab
   fetchCasesForDateRange(tabStartDate, tabEndDate, tabName, 1);
 } else {
   console.log(\`Tab \${tabName} already loaded, restoring from cache\`);
   // Restore data from cache for this tab
   if (tabDataCache[tabName] && tabDataCache[tabName].pages) {
     // Restore paginated cache
     pageDataCache = {...tabDataCache[tabName].pages};
     fetchedPages = new Set(Object.keys(pageDataCache).map(p => parseInt(p)));
     totalCasesInRange = tabDataCache[tabName].totalCases || 0;
     // Reconstruct allCases from cached pages
     allCases = [];
     Object.keys(pageDataCache).sort((a, b) => parseInt(a) - parseInt(b)).forEach(pageNum => {
       allCases = allCases.concat(pageDataCache[pageNum]);
     });
   } else {
     // Legacy cache format (all data)
     allCases = tabDataCache[tabName] || [];
   }
   filteredCases = allCases;
   currentPage = 1; // Reset to page 1 when restoring
   // Re-render existing data for this tab
   renderCases();
   updateRangeDisplay();
 }
}

// Update tab button styles to show active state
function updateTabStyles(activeTabName) {
 // Remove active class from all tab buttons
 const tabButtons = {
   'today': document.getElementById('today-btn'),
   'yesterday': document.getElementById('yesterday-btn'),
   'this-week': document.getElementById('this-week-btn'),
   'last-week': document.getElementById('last-week-btn'),
   'this-month': document.getElementById('this-month-btn')
 };
 
 // Remove active styling from all buttons
 Object.values(tabButtons).forEach(btn => {
   if (btn) {
     btn.classList.remove('active-tab');
     btn.style.backgroundColor = '';
     btn.style.color = '';
     btn.style.fontWeight = '';
   }
 });
 
 // Add active styling to selected tab (if not null)
 if (activeTabName && tabButtons[activeTabName]) {
   const activeBtn = tabButtons[activeTabName];
   activeBtn.classList.add('active-tab');
   activeBtn.style.backgroundColor = '#3498db';
   activeBtn.style.color = 'white';
   activeBtn.style.fontWeight = '600';
 }
}

// Fetch cases for a specific date range with server-side pagination
async function fetchCasesForDateRange(startDateParam, endDateParam, tabName = null, page = 1) {
 console.log(\`Fetching cases for range \${startDateParam} to \${endDateParam}, page \${page}...\`);
 
 // Check if date range changed - if so, reset pagination cache
 const dateRangeKey = \`\${startDateParam}-\${endDateParam}\`;
 if (currentDateRange.start !== startDateParam || currentDateRange.end !== endDateParam) {
   console.log('Date range changed, resetting pagination cache');
   fetchedPages.clear();
   pageDataCache = {};
   allCases = [];
   filteredCases = [];
   currentPage = 1;
   currentDateRange = { start: startDateParam, end: endDateParam };
 }
 
 // Check if this page is already cached
 if (fetchedPages.has(page) && pageDataCache[page]) {
   console.log(\`Page \${page} already cached, using cached data\`);
   allCases = pageDataCache[page];
   filteredCases = allCases;
   renderCases();
   updateRangeDisplay();
   return;
 }
 
 renderEmptyLoading();
 
 try {
   if (!startDateParam || !endDateParam) {
     allCases = [];
     filteredCases = [];
     updateRangeDisplay();
     document.getElementById('case-container').innerHTML = \`
       <div class="empty-state">
         <i class="fas fa-calendar-times"></i>
         <h3>No Date Range Selected</h3>
         <p>Please select a date range to view cases.</p>
       </div>
     \`;
     return;
   }
   
   // First, get total count (fetch page 1 to get count, or we can fetch with limit_start=0)
   // For Frappe API, we'll fetch first with a limit to get total count, then fetch the specific page
   
   // Calculate pagination offset
   const limitStart = (page - 1) * recordsPerPage;
   
   // Fetch only the current page from API (server-side pagination)
   console.log(\`Fetching page \${page} from API (limit: \${recordsPerPage}, limit_start: \${limitStart})\`);
   
   // Frappe API supports limit_start parameter for pagination
   const apiUrl = \`/api/frappe/cases?filters=[["cause_list_date",">=","\${startDateParam}"],["cause_list_date","<=","\${endDateParam}"]]&limit=\${recordsPerPage}&limit_start=\${limitStart}\`;
   const res = await fetch(apiUrl, { cache: 'no-store' });
   const data = await res.json();
   
   // Filter out cases marked as not relevant
   const relevantCases = data.data.filter(doc => (doc.relevancy || '').toLowerCase() !== 'not relevant');
   
   console.log(\`Fetched \${relevantCases.length} cases for page \${page} (offset: \${limitStart})\`);
   
   // Get total count from API response or estimate
   // Frappe typically returns a total count, but if not, we'll need to fetch it separately
   // For now, if this is page 1 and we got a full page, we know there might be more
   // If we got less than recordsPerPage, we know this is the last page
   
   // Fetch full details for all cases in this page (silently, no progress updates)
   const pageDetails = await Promise.all(
     relevantCases.map(doc =>
       fetch(\`/api/frappe/cases/\${doc.name}\`, { cache: 'no-store' })
         .then(r => r.json())
         .then(d => {
          return d.data;
        })
     )
   );
   
   // Filter out not relevant cases from details
   const fullCases = pageDetails.filter(d => (d.relevancy || '').toLowerCase() !== 'not relevant');
   
   // Store this page's data in cache
   pageDataCache[page] = fullCases;
   fetchedPages.add(page);
   
   // Update allCases - combine with previous pages if needed
   // For filtering to work, we need all loaded data
   allCases = [];
   Object.keys(pageDataCache).sort((a, b) => parseInt(a) - parseInt(b)).forEach(pageNum => {
     allCases = allCases.concat(pageDataCache[pageNum]);
   });
   
   filteredCases = allCases;
   
   // Fetch accurate total count when loading page 1
   if (page === 1) {
     try {
       // Fetch total count by making a query with limit=0 and checking response
       // Or fetch a single record to see if there are more
       // Actually, let's fetch all matching records count (without details)
       const countUrl = \`/api/frappe/cases?filters=[["cause_list_date",">=","\${startDateParam}"],["cause_list_date","<=","\${endDateParam}"]]&limit=0\`;
       const countRes = await fetch(countUrl, { cache: 'no-store' });
       const countData = await countRes.json();
       
       // Filter out not relevant cases
       const allRelevantInRange = (countData.data || []).filter(doc => (doc.relevancy || '').toLowerCase() !== 'not relevant');
       totalCasesInRange = allRelevantInRange.length;
       console.log(\`Fetched accurate total count: \${totalCasesInRange} cases in date range\`);
     } catch (countError) {
       console.warn('Could not fetch total count, using estimate:', countError);
       // Fallback to estimation if count query fails
       if (fullCases.length === recordsPerPage) {
         totalCasesInRange = recordsPerPage + 1;
       } else {
         totalCasesInRange = fullCases.length;
       }
     }
   }
   
   // Update estimate if we encounter a partial page (last page)
   if (fullCases.length < recordsPerPage) {
     // This is the last page, update total to be accurate
     totalCasesInRange = limitStart + fullCases.length;
     console.log(\`Updated total count to \${totalCasesInRange} (found last page)\`);
   }
   
   console.log(\`Page \${page} loaded successfully. Total cases in range: ~\${totalCasesInRange}\`);
   
   // Cache data for this tab if tabName is provided
   if (tabName) {
     tabDataCache[tabName] = { pages: {...pageDataCache}, totalCases: totalCasesInRange };
   }
   
   // Now render the current page
   populateFilterOptions();
   
   // Render immediately after data load
   if (renderTimeout) {
     clearTimeout(renderTimeout);
     renderTimeout = null;
   }
   isRendering = false;
   renderCases();
   
   // Update range display
   updateRangeDisplay();
} catch (error) {
  console.error('Error loading cases:', error);
  document.getElementById('case-container').innerHTML = \`
    <div class="empty-state">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Error Loading Cases</h3>
      <p>There was a problem fetching case data. Please try again.</p>
      <button class="btn btn-primary" onclick="fetchCasesForDateRange('\${startDateParam}', '\${endDateParam}')">
        <i class="fas fa-sync-alt"></i> Retry
      </button>
    </div>
  \`;
}
}

// Helper function to check if any filters are active
function hasActiveFilters() {
  return !!(document.getElementById('priority-filter')?.value ||
    document.getElementById('case-age-filter')?.value ||
    document.getElementById('case-category-filter')?.value ||
    document.getElementById('case-type-filter')?.value ||
    document.getElementById('case-stage-filter')?.value ||
    document.getElementById('match-keyword-filter')?.value ||
    document.getElementById('court-no-filter')?.value ||
    document.getElementById('cause-list-filter')?.value ||
    (document.getElementById('search-input')?.value || '').trim());
}

// Function to display active filters
function displayActiveFilters(casesToDisplay) {
const activeFiltersContainer = document.getElementById('active-filters');
const activeFilterTags = document.getElementById('active-filter-tags');
const filterResultsCount = document.getElementById('filter-results-count');

// Get active filter values
const activeFilters = [];

const priorityFilter = document.getElementById('priority-filter')?.value;
const caseAgeFilter = document.getElementById('case-age-filter')?.value;
const categoryFilter = document.getElementById('case-category-filter')?.value;
const caseTypeFilter = document.getElementById('case-type-filter')?.value;
const stageFilter = document.getElementById('case-stage-filter')?.value;
const keywordFilter = document.getElementById('match-keyword-filter')?.value;
const courtFilter = document.getElementById('court-no-filter')?.value;
const causeListFilter = document.getElementById('cause-list-filter')?.value;
const searchQuery = document.getElementById('search-input')?.value;

if (priorityFilter) activeFilters.push({ type: 'priority', value: priorityFilter, label: \`Priority: \${priorityFilter}\` });
if (caseAgeFilter) {
  const ageLabel = caseAgeFilter === "1" ? "New Cases" : "Old/Repeat Cases";
  activeFilters.push({ type: 'case-age', value: caseAgeFilter, label: \`Age: \${ageLabel}\` });
}
if (categoryFilter) activeFilters.push({ type: 'category', value: categoryFilter, label: \`Category: \${categoryFilter}\` });
if (caseTypeFilter) activeFilters.push({ type: 'case-type', value: caseTypeFilter, label: \`Type: \${caseTypeFilter}\` });
if (stageFilter) activeFilters.push({ type: 'stage', value: stageFilter, label: \`Stage: \${stageFilter}\` });
if (keywordFilter) activeFilters.push({ type: 'keyword', value: keywordFilter, label: \`Keyword: \${keywordFilter}\` });
if (courtFilter) activeFilters.push({ type: 'court', value: courtFilter, label: \`Court: \${courtFilter}\` });
if (causeListFilter) activeFilters.push({ type: 'cause-list', value: causeListFilter, label: \`Cause List: \${causeListFilter}\` });
if (searchQuery) activeFilters.push({ type: 'search', value: searchQuery, label: \`Search: "\${searchQuery}"\` });

if (activeFilters.length === 0) {
  activeFiltersContainer.style.display = 'none';
  return;
}

// Show active filters
activeFiltersContainer.style.display = 'flex';

// Create filter tags
activeFilterTags.innerHTML = activeFilters.map(filter => \`
  <div class="active-filter-tag">
    \${filter.label}
    <button class="remove-filter" onclick="removeFilter('\${filter.type}')">×</button>
  </div>
\`).join('');

// Show results count
filterResultsCount.textContent = \`Showing \${casesToDisplay.length} cases\`;
}

// Function to remove a specific filter
function removeFilter(filterType) {
console.log(\`Removing filter: \${filterType}\`);

switch(filterType) {
  case 'priority':
    document.getElementById('priority-filter').value = '';
    break;
  case 'case-age':
    document.getElementById('case-age-filter').value = '';
    break;
  case 'category':
    document.getElementById('case-category-filter').value = '';
    break;
  case 'case-type':
    document.getElementById('case-type-filter').value = '';
    break;
  case 'stage':
    document.getElementById('case-stage-filter').value = '';
    break;
  case 'keyword':
    document.getElementById('match-keyword-filter').value = '';
    break;
  case 'court':
    document.getElementById('court-no-filter').value = '';
    break;
  case 'cause-list':
    document.getElementById('cause-list-filter').value = '';
    break;
  case 'search':
    document.getElementById('search-input').value = '';
    break;
}

applyFilters();
}

// Populate filter dropdowns with options and case counts
function populateFilterOptions() {
console.log('Populating filter options with counts...');

// Get current cases for the selected date range
let currentCases = allCases.filter(d => d.cause_list_date >= startDate && d.cause_list_date <= endDate);

// Priority filter
const prioritySelect = document.getElementById('priority-filter');
if (prioritySelect) {
  const currentValue = prioritySelect.value;
  prioritySelect.innerHTML = '<option value="">All Priorities</option>';
  const priorityOptions = ['High', 'Medium', 'Low'];
  priorityOptions.forEach(priority => {
    const count = currentCases.filter(d => (d.priority || '').toUpperCase() === priority.toUpperCase()).length;
    const option = document.createElement('option');
    option.value = priority;
    option.textContent = \`\${priority} (\${count})\`;
    prioritySelect.appendChild(option);
  });
  prioritySelect.value = currentValue;
}

// Add New/Old Case filter
const caseAgeSelect = document.getElementById('case-age-filter');
if (caseAgeSelect) {
  const currentValue = caseAgeSelect.value;
  caseAgeSelect.innerHTML = '<option value="">All Cases</option>';
  
  const newCaseCount = currentCases.filter(d => d.old_new === 1 || d.old_new === '1').length;
  const oldCaseCount = currentCases.filter(d => d.old_new === 0 || d.old_new === '0' || d.old_new === null).length;
  
  const newOption = document.createElement('option');
  newOption.value = "1";
  newOption.textContent = \`New Cases (\${newCaseCount})\`;
  caseAgeSelect.appendChild(newOption);
  
  const oldOption = document.createElement('option');
  oldOption.value = "0";
  oldOption.textContent = \`Old/Repeat Cases (\${oldCaseCount})\`;
  caseAgeSelect.appendChild(oldOption);
  caseAgeSelect.value = currentValue;
}

// Case Categories filter
const categorySelect = document.getElementById('case-category-filter');
if (categorySelect) {
  const currentValue = categorySelect.value;
  categorySelect.innerHTML = '<option value="">All Categories</option>';
  const categoryOptions = ['NON-SERVICE', 'SERVICE', 'NA'];
  categoryOptions.forEach(category => {
    const count = currentCases.filter(d => (d.case_categories || '').toUpperCase() === category).length;
    const option = document.createElement('option');
    option.value = category;
    option.textContent = \`\${category} (\${count})\`;
    categorySelect.appendChild(option);
  });
  categorySelect.value = currentValue;
}

// Case Type filter
const caseTypeSelect = document.getElementById('case-type-filter');
if (caseTypeSelect) {
  const currentValue = caseTypeSelect.value;
  caseTypeSelect.innerHTML = '<option value="">All Types</option>';
  
  // Get all unique case_type values and their counts
  const caseTypes = {};
  currentCases.forEach(d => {
    if (d.case_type) {
      const caseType = d.case_type.toUpperCase();
      caseTypes[caseType] = (caseTypes[caseType] || 0) + 1;
    }
  });
  
  // Sort case types alphabetically and add options
  Object.keys(caseTypes).sort().forEach(caseType => {
    const option = document.createElement('option');
    option.value = caseType;
    option.textContent = \`\${caseType} (\${caseTypes[caseType]})\`;
    caseTypeSelect.appendChild(option);
  });
  caseTypeSelect.value = currentValue;
}

// Case Stage filter
const stageSelect = document.getElementById('case-stage-filter');
if (stageSelect) {
  const currentValue = stageSelect.value;
  stageSelect.innerHTML = '<option value="">All Stages</option>';
  
  // Get all unique case_stage values and their counts
  const caseStages = {};
  currentCases.forEach(d => {
    if (d.case_stage) {
      const caseStage = d.case_stage.toUpperCase();
      caseStages[caseStage] = (caseStages[caseStage] || 0) + 1;
    }
  });
  
  // Sort case stages alphabetically and add options
  Object.keys(caseStages).sort().forEach(caseStage => {
    const option = document.createElement('option');
    option.value = caseStage;
    option.textContent = \`\${caseStage} (\${caseStages[caseStage]})\`;
    stageSelect.appendChild(option);
  });
  stageSelect.value = currentValue;
}

// Match Keyword filter
const keywordSelect = document.getElementById('match-keyword-filter');
if (keywordSelect) {
  const currentValue = keywordSelect.value;
  keywordSelect.innerHTML = '<option value="">All Keywords</option>';
  
  // Get all unique match_keyword values and their counts
  const matchKeywords = {};
  currentCases.forEach(d => {
    if (d.match_keyword) {
      // Split by commas if match_keyword contains multiple keywords
      const keywords = d.match_keyword.split(',').map(kw => kw.trim());
      
      keywords.forEach(keyword => {
        if (keyword) {
          matchKeywords[keyword] = (matchKeywords[keyword] || 0) + 1;
        }
      });
    }
  });
  
  // Sort keywords alphabetically and add options
  Object.keys(matchKeywords).sort().forEach(keyword => {
    const option = document.createElement('option');
    option.value = keyword;
    option.textContent = \`\${keyword} (\${matchKeywords[keyword]})\`;
    keywordSelect.appendChild(option);
  });
  keywordSelect.value = currentValue;
}

// Court Number filter
const courtSelect = document.getElementById('court-no-filter');
if (courtSelect) {
  const currentValue = courtSelect.value;
  courtSelect.innerHTML = '<option value="">All Courts</option>';
  const courtOptions = Array.from({length: 33}, (_, i) => \`COURT NO. \${i+1}\`);
  courtOptions.push('NA');
  
  courtOptions.forEach(court => {
    const count = currentCases.filter(d => (d.court_no || '').toUpperCase() === court).length;
    const option = document.createElement('option');
    option.value = court;
    option.textContent = \`\${court} (\${count})\`;
    courtSelect.appendChild(option);
  });
  courtSelect.value = currentValue;
}

// Cause List filter
const causeListSelect = document.getElementById('cause-list-filter');
if (causeListSelect) {
  const currentValue = causeListSelect.value;
  causeListSelect.innerHTML = '<option value="">All Cause Lists</option>';
  
  // Get all unique cause_list values and their counts
  const causeLists = {};
  currentCases.forEach(d => {
    if (d.cause_list) {
      const causeList = d.cause_list;
      causeLists[causeList] = (causeLists[causeList] || 0) + 1;
    }
  });
  
  // Sort cause lists and add options
  Object.keys(causeLists).sort().forEach(causeList => {
    const option = document.createElement('option');
    option.value = causeList;
    option.textContent = \`\${causeList} (\${causeLists[causeList]})\`;
    causeListSelect.appendChild(option);
  });
  causeListSelect.value = currentValue;
}

console.log('Filter options populated with counts for the selected date range');
}

// Function to clear all filters
function clearFilters() {
console.log('Clearing all filters');
const filters = [
  'priority-filter',
  'case-age-filter',
  'case-category-filter',
  'case-type-filter',
  'case-stage-filter',
  'match-keyword-filter',
  'court-no-filter',
  'cause-list-filter',
  'search-input'
];

filters.forEach(id => {
  const element = document.getElementById(id);
  if (element) element.value = '';
});

applyFilters();
}

// Debounce render to prevent rapid re-renders
let renderTimeout = null;
let isRendering = false;

// Function to apply all active filters
function applyFilters() {
console.log('Applying filters...');

// Reset pagination to page 1 when filters change (not when just navigating pages)
currentPage = 1;

// Clear any pending render
if (renderTimeout) {
  clearTimeout(renderTimeout);
}

// Debounce render to batch rapid filter changes
renderTimeout = setTimeout(() => {
  if (!isRendering) {
    isRendering = true;
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {
renderCases();
      isRendering = false;
    });
  }
}, 150); // 150ms debounce
}

function renderCases() {
console.log(\`Rendering cases for range \${startDate} to \${endDate}...\`);

const container = document.getElementById('case-container');

// Get cases for the selected date range
let casesToDisplay = allCases.filter(d => d.cause_list_date >= startDate && d.cause_list_date <= endDate);

console.log(\`Found \${casesToDisplay.length} cases for the selected date range\`);

// Apply additional filters from filter dropdowns
const priorityFilter = document.getElementById('priority-filter')?.value;
const caseAgeFilter = document.getElementById('case-age-filter')?.value;
const categoryFilter = document.getElementById('case-category-filter')?.value;
const caseTypeFilter = document.getElementById('case-type-filter')?.value;
const stageFilter = document.getElementById('case-stage-filter')?.value;
const keywordFilter = document.getElementById('match-keyword-filter')?.value;
const courtFilter = document.getElementById('court-no-filter')?.value;
const causeListFilter = document.getElementById('cause-list-filter')?.value;

console.log('Active filters:', {
  dateRange: \`\${startDate} to \${endDate}\`,
  priority: priorityFilter,
  caseAge: caseAgeFilter,
  category: categoryFilter,
  caseType: caseTypeFilter,
  stage: stageFilter,
  keyword: keywordFilter,
  court: courtFilter,
  causeList: causeListFilter
});

// Apply priority filter
if (priorityFilter) {
  console.log(\`Applying priority filter: \${priorityFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => 
    (d.priority || '').toLowerCase() === priorityFilter.toLowerCase()
  );
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by priority\`);
}

// Apply case age filter (new vs old)
if (caseAgeFilter) {
    console.log(\`Applying case age filter: \${caseAgeFilter}\`);
  const before = casesToDisplay.length;
  if (caseAgeFilter === "1") {
    // New cases
    casesToDisplay = casesToDisplay.filter(d => d.old_new === 1 || d.old_new === '1');
  } else if (caseAgeFilter === "0") {
    // Old/repeat cases
    casesToDisplay = casesToDisplay.filter(d => d.old_new === 0 || d.old_new === '0' || d.old_new === null);
  }
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by case age\`);
}

if (categoryFilter) {
  console.log(\`Applying category filter: \${categoryFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => (d.case_categories || '').toUpperCase() === categoryFilter);
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by category\`);
}

if (caseTypeFilter) {
  console.log(\`Applying case type filter: \${caseTypeFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => (d.case_type || '').toUpperCase() === caseTypeFilter);
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by case type\`);
}

if (stageFilter) {
  console.log(\`Applying stage filter: \${stageFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => (d.case_stage || '').toUpperCase() === stageFilter);
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by stage\`);
}

if (keywordFilter) {
  console.log(\`Applying keyword filter: \${keywordFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => {
    // Check if keyword appears in the match_keyword field
    return d.match_keyword && d.match_keyword.split(',').map(kw => kw.trim()).includes(keywordFilter);
  });
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by keyword\`);
}

if (courtFilter) {
  console.log(\`Applying court filter: \${courtFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => (d.court_no || '').toUpperCase() === courtFilter);
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by court\`);
}

if (causeListFilter) {
  console.log(\`Applying cause list filter: \${causeListFilter}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => d.cause_list === causeListFilter);
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by cause list\`);
}

// Check for search query
const searchQuery = document.getElementById('search-input')?.value.toLowerCase();
if (searchQuery) {
    console.log(\`Filtering by search query: \${searchQuery}\`);
  const before = casesToDisplay.length;
  casesToDisplay = casesToDisplay.filter(d => 
    (d.case_type && d.case_type.toLowerCase().includes(searchQuery)) ||
    (d.pet_name && d.pet_name.toLowerCase().includes(searchQuery)) ||
    (d.res_name && d.res_name.toLowerCase().includes(searchQuery)) ||
    (d.cnr && d.cnr.toLowerCase().includes(searchQuery)) ||
    (d.filing_no && d.filing_no.toLowerCase().includes(searchQuery))
  );
  console.log(\`Filtered from \${before} to \${casesToDisplay.length} cases by search query\`);
}

// Display active filters and count
displayActiveFilters(casesToDisplay);

// Update the filter options after applying filters
populateFilterOptions();

// Store filtered cases globally for pagination
filteredCases = casesToDisplay;
totalFilteredCases = casesToDisplay.length;

// Note: Don't reset currentPage here - it should only be reset when filters actually change
// This allows pagination to work properly when navigating between pages

// Show empty state if no cases
if (casesToDisplay.length === 0) {
    container.innerHTML = \`
    <div class="empty-state">
      <i class="fas fa-search"></i>
      <h3>No Cases Found</h3>
      <p>No cases match your current filter criteria for the selected date range.</p>
    </div>
  \`;
  return;
}

// Render table view (only option now) with pagination
renderTableView(casesToDisplay, container);
}

function renderTableView(cases, container) {
console.log(\`Rendering \${cases.length} cases in table view\`);

// Prevent layout shift by maintaining container structure
const containerEl = document.getElementById('case-container');
if (containerEl) {
  // Preserve minimum height during render
  containerEl.style.minHeight = containerEl.offsetHeight > 400 ? containerEl.offsetHeight + 'px' : '400px';
}

// Sort cases by cause list date first, then by court number, then by item number
const sortedCases = [...cases].sort((a, b) => {
  // First sort by cause list date
  const dateA = a.cause_list_date || '';
  const dateB = b.cause_list_date || '';
  const dateComparison = dateA.localeCompare(dateB);
  
  if (dateComparison !== 0) {
    return dateComparison;
  }
  
  // Then sort by court number
  const courtA = a.court_no || '';
  const courtB = b.court_no || '';
  const courtComparison = courtA.localeCompare(courtB);
  
  if (courtComparison !== 0) {
    return courtComparison;
  }
  
  // If court numbers are the same, sort by item number
  const itemA = parseInt(a.item_no) || 0;
  const itemB = parseInt(b.item_no) || 0;
  return itemA - itemB;
});

// Calculate pagination
// Determine which total to use: filtered count if filters are active, otherwise use server total
const filtersActive = hasActiveFilters();

// Use filtered count if filters are active, otherwise use server total
const totalAvailableCases = filtersActive ? sortedCases.length : (totalCasesInRange > 0 ? totalCasesInRange : sortedCases.length);
const totalPages = Math.ceil(totalAvailableCases / recordsPerPage);
const startIndex = (currentPage - 1) * recordsPerPage;
const endIndex = startIndex + recordsPerPage;

// For server-side pagination: use current page's cached data directly
let paginatedCases;
if (totalCasesInRange > 0 && sortedCases.length < totalAvailableCases && pageDataCache[currentPage]) {
  // Server-side pagination: use current page's cached data
  paginatedCases = pageDataCache[currentPage];
  // Sort the page data
  paginatedCases = [...paginatedCases].sort((a, b) => {
    const dateA = a.cause_list_date || '';
    const dateB = b.cause_list_date || '';
    const dateComparison = dateA.localeCompare(dateB);
    if (dateComparison !== 0) return dateComparison;
    const courtA = a.court_no || '';
    const courtB = b.court_no || '';
    const courtComparison = courtA.localeCompare(courtB);
    if (courtComparison !== 0) return courtComparison;
    const itemA = parseInt(a.item_no) || 0;
    const itemB = parseInt(b.item_no) || 0;
    return itemA - itemB;
  });
} else {
  // Client-side pagination or all data loaded: slice from sorted data
  paginatedCases = sortedCases.slice(startIndex, endIndex);
}

console.log(\`Showing page \${currentPage} of \${totalPages}: records \${startIndex + 1} to \${Math.min(endIndex, totalAvailableCases)} of \${totalAvailableCases} (loaded: \${sortedCases.length})\`);

container.innerHTML = \`
  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th class="serial-column">#</th>
          <th>Item No</th>
          <th>Case Info</th>
          <th>Parties</th>
          <th>AI Synopsis</th>
          <th>Last Proceedings</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="cases-table-body"></tbody>
    </table>
  </div>
  <div id="pagination-container"></div>
\`;

const tableBody = document.getElementById('cases-table-body');

// Clear previous rows
tableBody.innerHTML = '';

// Render cases with lazy loading (progressive rendering for smooth UI)
paginatedCases.forEach((caseDoc, localIndex) => {
  // For server-side pagination, calculate global index based on current page
  const globalIndex = startIndex + localIndex;
  
  // Use setTimeout for progressive rendering - first 3 immediately, rest with slight delay
  const renderDelay = localIndex < 3 ? 0 : (localIndex - 3) * 10;
  
  setTimeout(() => {
  const tr = document.createElement('tr');
  
  // Create View link if s3_html_link exists
  const viewLink = caseDoc.s3_html_link ? 
    \`<a href="\${caseDoc.s3_html_link}" target="_blank" class="btn btn-sm btn-primary view-link">
      <i class="fas fa-external-link-alt"></i> View
    </a>\` : '';
  
  // Create View Prayer link if prayer exists - using span with onclick to prevent page jump
  const viewPrayerLink = caseDoc.prayer ? 
    \`<span class="prayer-link" onclick="openPrayerModal('\${caseDoc.name}'); event.preventDefault(); return false;">
      View Prayer
    </span>\` : '';
  
  // Create Order link if order_link exists
  const orderLink = caseDoc.order_link ? 
    \`<a href="\${caseDoc.order_link}" target="_blank" class="btn btn-sm btn-success">
      <i class="fas fa-gavel"></i> View Order
    </a>\` : '';
  
  // Add case age indicator
  const caseAgeTag = caseDoc.old_new === 1 || caseDoc.old_new === '1' ? 
    '<span class="status-In-progress">New Case</span>' : 
    '<span class="status-Completed">Repeat Case</span>';
  
  // Add priority indicator
  const priorityClass = caseDoc.priority ? \`priority-\${caseDoc.priority}\` : '';
  const priorityTag = caseDoc.priority ? 
    \`<span class="\${priorityClass}">\${caseDoc.priority} Priority</span>\` : '';
  
  // Add main_number to the category display
  const categoryDisplay = caseDoc.case_categories || 'N/A';
  const mainNumberDisplay = caseDoc.main_number ? \` | Main #: \${caseDoc.main_number}\` : '';
  
  tr.innerHTML = \`
      <td class="serial-column">\${globalIndex + 1}</td>
    <td>\${caseDoc.item_no || 'N/A'}</td>
    <td>
      <strong>\${caseDoc.case_type || 'Unnamed Case'}</strong> \${viewLink}
      <br>\${caseDoc.case_status || 'Unknown'} @ \${caseDoc.case_stage || 'Unknown'}
      <br>Filing #: \${caseDoc.filing_no || 'N/A'} | CNR: \${caseDoc.cnr || 'N/A'}
      <br>Category: \${categoryDisplay}\${mainNumberDisplay} \${caseAgeTag}
      <br><strong>Court:</strong> \${caseDoc.court_no || 'Unknown'}
      <br>\${caseDoc.court_number_and_judge || 'N/A'}
      <br><strong>Filed:</strong> \${formatDate(caseDoc.filing_date)}
      <br><strong>Next:</strong> \${formatDate(caseDoc.next_hearing_date)}
      \${caseDoc.cause_list_date ? \`<br><strong>Cause List:</strong> \${formatDate(caseDoc.cause_list_date)}\` : ''}
      \${priorityTag ? \`<br>\${priorityTag}\` : ''}
      \${viewPrayerLink ? \`<br>\${viewPrayerLink}\` : ''}
    </td>
    <td>
      <strong>Pet:</strong> \${caseDoc.pet_name || 'Unknown'}
      <br><strong>Res:</strong> \${caseDoc.res_name || 'Unknown'}
    </td>
    <td>
      <div class="synopsis-editable" contenteditable="true" oninput="saveEdits('\${caseDoc.name}', this.innerText)" tabindex="0">
        \${caseDoc.synopsis || 'Click to edit'}
      </div>
    </td>
    <td>
      \${caseDoc.last_proceedings || 'No proceedings recorded'} 
      \${orderLink}
    </td>
    <td>
      <button class="btn btn-danger btn-sm" onclick="setHighPriority('\${caseDoc.name}')" style="margin-bottom: 10px;">
        <i class="fas fa-exclamation-circle"></i> High Priority
      </button>
      <br>
      <button class="btn btn-primary btn-sm" onclick="openAlertModal('\${caseDoc.name}')">
        <i class="fas fa-bell"></i> Send Alert
      </button>
    </td>
  \`;
  tableBody.appendChild(tr);
    
    // Render pagination controls after last row
    if (localIndex === paginatedCases.length - 1) {
      setTimeout(() => {
        renderPaginationControls(totalPages, totalAvailableCases, startIndex, endIndex);
      }, 100);
    }
  }, renderDelay);
});

// If no cases, render pagination immediately
if (paginatedCases.length === 0) {
  renderPaginationControls(totalPages, totalAvailableCases, startIndex, endIndex);
}

// Reset container min-height after render completes to allow natural sizing
setTimeout(() => {
  if (containerEl) {
    containerEl.style.minHeight = '';
  }
}, 100);
}

// Function to render pagination controls
function renderPaginationControls(totalPages, totalCases, startIndex, endIndex) {
const paginationContainer = document.getElementById('pagination-container');
if (!paginationContainer) return;

if (totalPages <= 1) {
  paginationContainer.innerHTML = \`
    <div class="pagination-inner">
      <div class="pagination-info-left">
      Showing all \${totalCases} cases
      </div>
    </div>
  \`;
  return;
}

// Show up to 10 pages starting from current page
let startPage = currentPage;
let endPage = Math.min(currentPage + 9, totalPages);

// If near the end, show pages before current
if (endPage === totalPages && totalPages > 10) {
  startPage = Math.max(1, totalPages - 9);
  endPage = totalPages;
}

const pageNumbers = [];
for (let i = startPage; i <= endPage; i++) {
  pageNumbers.push(i);
}

paginationContainer.innerHTML = \`
  <div class="pagination-inner">
    <div class="pagination-info-left">
      Page \${currentPage} of \${totalPages}
  </div>
  <div class="pagination-controls">
      \${currentPage > 1 ? \`<button class="pagination-link" onclick="goToPage(\${currentPage - 1})" title="Previous page">Prev</button>\` : ''}
      \${pageNumbers.map(page => 
        page === currentPage 
          ? \`<button class="pagination-btn-active" aria-current="page">\${page}</button>\`
          : \`<button class="pagination-link" onclick="goToPage(\${page})">\${page}</button>\`
      ).join('')}
      \${currentPage < totalPages ? \`<button class="pagination-link" onclick="goToPage(\${currentPage + 1})" title="Next page">NEXT</button>\` : ''}
    </div>
  </div>
\`;
}

// Function to navigate to a specific page (with server-side pagination)
async function goToPage(page) {
// Determine total based on whether filters are active
const filtersActive = hasActiveFilters();

// Use filtered count if filters are active, otherwise use server total
const totalAvailable = filtersActive ? totalFilteredCases : (totalCasesInRange > 0 ? totalCasesInRange : filteredCases.length);
const totalPages = Math.ceil(totalAvailable / recordsPerPage);
if (page < 1 || page > totalPages) return;

console.log(\`Navigating to page \${page} of \${totalPages}\`);
currentPage = page;

// Clear any pending debounced renders
if (renderTimeout) {
  clearTimeout(renderTimeout);
  renderTimeout = null;
}
isRendering = false;

// If this page is already cached, just render it
if (fetchedPages.has(page) && pageDataCache[page]) {
  console.log(\`Page \${page} is cached, rendering from cache\`);
  renderCases();
  // Scroll to top of table
  const container = document.getElementById('case-container');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return;
}

// Fetch this page from API
console.log(\`Fetching page \${page} from API...\`);
await fetchCasesForDateRange(currentDateRange.start, currentDateRange.end, activeTab, page);

// Scroll to top of table
const container = document.getElementById('case-container');
if (container) {
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}

// Function to handle page input navigation
function goToPageInput() {
const pageInput = document.getElementById('page-input');
if (!pageInput) return;

const page = parseInt(pageInput.value);
if (isNaN(page) || page < 1) {
  showNotification('Please enter a valid page number', 'error');
  return;
}

// Determine total based on whether filters are active
const filtersActive = hasActiveFilters();

const totalAvailable = filtersActive ? totalFilteredCases : (totalCasesInRange > 0 ? totalCasesInRange : filteredCases.length);
const totalPages = Math.ceil(totalAvailable / recordsPerPage);

if (page > totalPages) {
  showNotification(\`Page number cannot exceed \${totalPages}\`, 'error');
  pageInput.value = currentPage;
  return;
}

goToPage(page);
}

// Function to open prayer modal - prevent default behavior and page jumping
function openPrayerModal(docname) {
console.log(\`Opening prayer modal for case \${docname}\`);

// Find the case and display its prayer
const currentCase = allCases.find(c => c.name === docname);
if (currentCase && currentCase.prayer) {
  document.getElementById('prayer-content').textContent = currentCase.prayer;
} else {
  document.getElementById('prayer-content').textContent = 'No prayer content available for this case.';
}

// Prevent any default link behavior and page jumping
event.preventDefault();
event.stopPropagation();

openModal('prayer-modal');

return false;
}

// Function to open missing case modal
function openMissingCaseModal() {
console.log('Opening missing case modal');

// Reset form
document.getElementById('missing-case-form').reset();

// Set current start date as default
document.getElementById('missing-cause-list-date').value = startDate;

// Hide confirmation section
document.getElementById('confirmation-section').style.display = 'none';
document.getElementById('submit-missing-case-btn').style.display = 'inline-flex';

openModal('missing-case-modal');
}

// Function to show missing case confirmation
function showMissingCaseConfirmation() {
const mainNumber = document.getElementById('missing-main-number').value;
const courtNumber = document.getElementById('missing-court-number').value;
const causeListDate = document.getElementById('missing-cause-list-date').value;

// Validate required fields
if (!mainNumber || !courtNumber || !causeListDate) {
  showNotification('Please fill in all required fields', 'error');
  return;
}

// Check if it's today's cause list
const today = new Date().toISOString().split('T')[0];
const isTodaysCauseList = causeListDate === today;

// Show confirmation
const confirmationText = isTodaysCauseList 
  ? \`Are you sure you want to submit this missing case for TODAY'S cause list (\${causeListDate})?\`
  : \`Are you sure you want to submit this missing case for \${causeListDate}? This is NOT today's cause list.\`;

document.getElementById('confirmation-text').textContent = confirmationText;
document.getElementById('confirmation-section').style.display = 'block';
document.getElementById('submit-missing-case-btn').style.display = 'none';
}

// Function to hide confirmation and show submit button again
function hideConfirmation() {
document.getElementById('confirmation-section').style.display = 'none';
document.getElementById('submit-missing-case-btn').style.display = 'inline-flex';
}

// Function to confirm and submit missing case
function confirmAndSubmitMissingCase() {
const mainNumber = document.getElementById('missing-main-number').value;
const courtNumber = document.getElementById('missing-court-number').value;
const causeListDate = document.getElementById('missing-cause-list-date').value;
const additionalContext = document.getElementById('missing-additional-context').value;

console.log('Submitting missing case:', {
  mainNumber,
  courtNumber,
  causeListDate,
  additionalContext
});

// Prepare data for webhook
const today = new Date().toISOString().split('T')[0];
const webhookData = {
  missing_case_main_number: mainNumber,
  court_number: courtNumber,
  cause_list_date: causeListDate,
  additional_context: additionalContext,
  is_todays_cause_list: causeListDate === today,
  submitted_at: new Date().toISOString(),
  submitted_by: 'Legal Command Centre User'
};

// Send to webhook
fetch('https://automation.lendingcube.ai/webhook/missing-cases', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(webhookData)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Webhook response was not ok');
  }
  return response.text();
})
.then(responseText => {
  console.log('Missing case webhook response:', responseText);
  
  // Show success notification
  showNotification('Missing case submitted successfully');
  closeModal('missing-case-modal');
  
  // Reset form
  document.getElementById('missing-case-form').reset();
  document.getElementById('missing-cause-list-date').value = startDate;
})
.catch(error => {
  console.error('Error submitting missing case:', error);
  showNotification('Failed to submit missing case: ' + error.message, 'error');
});
}

// Function to set high priority only
function setHighPriority(docname) {
console.log(\`Setting priority for case \${docname} to High\`);

fetch(\`/api/frappe/cases/\${docname}\`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Frappe-CSRF-Token': (typeof frappe !== 'undefined' && frappe.csrf_token) ? frappe.csrf_token : (getCookie('csrftoken') || '')
  },
  body: JSON.stringify({ 
    priority: 'High',
    synopsis_status: 'Pending' 
  })
})
.then(response => {
  if (!response.ok) {
    return response.text().then(text => {
      const message = text || \`Status \${response.status}\`;
      throw new Error(message);
    });
  }
  return response.json();
})
.then(() => {
  console.log(\`Successfully updated priority to High and synopsis_status to Pending\`);
  // Find and update the case in our local data
  const caseIndex = allCases.findIndex(c => c.name === docname);
  if (caseIndex >= 0) {
    allCases[caseIndex].priority = 'High';
    allCases[caseIndex].synopsis_status = 'Pending';
  }
  
  // Re-render the current view to reflect changes
  renderCases();
  
  // Show success notification
  showNotification('Priority set to High');
})
.catch(error => {
  console.error('Error updating priority:', error);
  showNotification('Failed to update priority', 'error');
});
}

// Function to save edits to synopsis field
function saveEdits(docname, newSynopsis) {
console.log(\`Saving synopsis for case \${docname}\`);

// Prevent continuous updates - add a delay
clearTimeout(window.synopsisTimeout);
window.synopsisTimeout = setTimeout(() => {
  fetch(\`/api/frappe/cases/\${docname}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Frappe-CSRF-Token': (typeof frappe !== 'undefined' && frappe.csrf_token) ? frappe.csrf_token : (getCookie('csrftoken') || '')
    },
    body: JSON.stringify({ synopsis: newSynopsis })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(() => {
    console.log('Successfully updated synopsis');
    // Update the case in our local data
    const caseIndex = allCases.findIndex(c => c.name === docname);
    if (caseIndex >= 0) {
      allCases[caseIndex].synopsis = newSynopsis;
    }
  })
  .catch(error => {
    console.error('Error updating synopsis:', error);
  });
}, 1000); // Wait for 1 second of inactivity before saving
}

// Function to open alert modal
function openAlertModal(docname) {
console.log(\`Opening alert modal for case \${docname}\`);
currentDocname = docname;

// Populate existing alert_to value if available
const currentCase = allCases.find(c => c.name === docname);
if (currentCase && currentCase.alert_to) {
  // Try to match with a dropdown option first
  const selectElement = document.getElementById('alert-to-select');
  const matchingOption = Array.from(selectElement.options).find(option => 
    option.value === currentCase.alert_to
  );
  
  if (matchingOption) {
    selectElement.value = currentCase.alert_to;
  } else {
    // If no match found in dropdown, set to empty
    selectElement.value = '';
  }
} else {
  // Clear select if no alert_to value
  document.getElementById('alert-to-select').value = '';
}

openModal('alert-modal');
}

// Function to send alert - simplified to only call webhook with no database updates
function sendAlert() {
const alertTo = document.getElementById('alert-to-select').value;

if (!alertTo) {
  showNotification('Please select a department', 'error');
  return;
}

console.log(\`Sending alert for case \${currentDocname} to \${alertTo}\`);

// Get all case data to send to webhook
const caseDoc = allCases.find(c => c.name === currentDocname);
if (!caseDoc) {
  showNotification('Case data not found', 'error');
  return;
}

// Prepare data for webhook - send all table fields and _id
const webhookData = {
  _id: caseDoc.name,
  // Table fields
  case_info: {
    case_type: caseDoc.case_type,
    case_status: caseDoc.case_status,
    case_stage: caseDoc.case_stage,
    filing_no: caseDoc.filing_no,
    cnr: caseDoc.cnr,
    case_categories: caseDoc.case_categories,
    item_no: caseDoc.item_no
  },
  parties: {
    pet_name: caseDoc.pet_name,
    res_name: caseDoc.res_name
  },
  court_info: {
    court_no: caseDoc.court_no,
    court_number_and_judge: caseDoc.court_number_and_judge
  },
  timeline: {
    filing_date: caseDoc.filing_date,
    next_hearing_date: caseDoc.next_hearing_date,
    cause_list_date: caseDoc.cause_list_date
  },
  last_proceedings: caseDoc.last_proceedings,
  synopsis: caseDoc.synopsis,
  alert_to: alertTo  // Include the selected department
};

// Send directly to webhook without any database updates
fetch('https://lead.marketleap.in/webhook/synopsis1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(webhookData)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Webhook response was not ok');
  }
  return response.text();
})
.then(responseText => {
  console.log('Webhook response:', responseText);
  
  // Any response is considered successful
  console.log('Alert sent successfully');
  showNotification('Alert sent successfully');
  closeModal('alert-modal');
})
.catch(error => {
  console.error('Error sending alert:', error);
  showNotification('Failed to send alert: ' + error.message, 'error');
});
}

// Modal handling functions
function openModal(modalId) {
console.log(\`Opening modal: \${modalId}\`);
document.getElementById(modalId).style.display = 'block';
document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal(modalId) {
console.log(\`Closing modal: \${modalId}\`);
document.getElementById(modalId).style.display = 'none';
document.body.style.overflow = ''; // Re-enable scrolling
}

// Show notification function
function showNotification(message, type = 'success') {
console.log(\`Showing notification: \${message} (\${type})\`);
// Check if notification container exists, create if not
let container = document.getElementById('notification-container');
if (!container) {
  container = document.createElement('div');
  container.id = 'notification-container';
  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.right = '20px';
  container.style.zIndex = '1000';
  document.body.appendChild(container);
}

// Create notification element
const notification = document.createElement('div');
notification.style.backgroundColor = type === 'success' ? '#2ecc71' : '#e74c3c';
notification.style.color = 'white';
notification.style.padding = '12px 20px';
notification.style.marginBottom = '10px';
notification.style.borderRadius = '4px';
notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
notification.style.display = 'flex';
notification.style.alignItems = 'center';
notification.style.justifyContent = 'space-between';
notification.style.minWidth = '250px';
notification.style.animation = 'slideIn 0.3s ease-out';

// Add icon based on type
const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

notification.innerHTML = \`
  <div style="display: flex; align-items: center;">
    <i class="\${icon}" style="margin-right: 10px;"></i>
    <span>\${message}</span>
  </div>
  <button style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">
    <i class="fas fa-times"></i>
  </button>
\`;

// Add notification to container
container.appendChild(notification);

// Add close button event listener
const closeBtn = notification.querySelector('button');
closeBtn.addEventListener('click', () => {
  container.removeChild(notification);
});

// Auto-remove after 5 seconds
setTimeout(() => {
  if (container.contains(notification)) {
    container.removeChild(notification);
  }
}, 5000);
}

function getCookie(name) {
const value = \`; \${document.cookie}\`;
const parts = value.split(\`; \${name}=\`);
if (parts.length === 2) return parts.pop().split(';').shift();
}

// Event listener for search input
document.getElementById('search-input').addEventListener('input', debounce(() => {
console.log('Search input changed');
renderCases();
}, 300));

// Event listener for home button
document.getElementById('home-btn').addEventListener('click', () => {
  window.location.href = '/todaycauselist';
});

// Event listener for refresh button
document.getElementById('refresh-btn').addEventListener('click', () => {
console.log('Refresh button clicked');
fetchAvailableDates(); // Refresh the complete data
});

// Event listener for signout button
// Check auth and show profile icon
async function checkAuthAndShowProfile() {
  try {
    const response = await fetch('/api/auth/check', {
      credentials: 'include'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.message && data.message !== 'Guest') {
        const profileContainer = document.getElementById('profile-dropdown-container');
        const profileIcon = document.getElementById('profile-icon');
        if (profileContainer && profileIcon) {
          profileContainer.style.display = 'block';
          const initial = data.message.charAt(0).toUpperCase();
          profileIcon.textContent = initial;
        }
      }
    }
  } catch (error) {
    console.error('Auth check error:', error);
  }
}

// Initialize profile on page load
checkAuthAndShowProfile();

// Session validation - check periodically and on API errors
let sessionCheckInterval = null;
let isRedirecting = false;

async function validateSession() {
  // Prevent multiple simultaneous redirects
  if (isRedirecting) return;

  try {
    const response = await fetch('/api/auth/check', {
      credentials: 'include'
    });
    
    if (!response.ok) {
      isRedirecting = true;
      window.location.href = '/';
      return;
    }
    
    const data = await response.json();
    if (!data || !data.message || data.message === 'Guest') {
      isRedirecting = true;
      window.location.href = '/';
    }
  } catch (error) {
    // Session check failed, redirect to login
    isRedirecting = true;
    window.location.href = '/';
  }
}

// Check session every 30 seconds
sessionCheckInterval = setInterval(validateSession, 30000);

// Also check on visibility change (when user switches tabs/windows)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    validateSession();
  }
});

// Check on window focus
window.addEventListener('focus', validateSession);

// Enhanced fetch wrapper to check for auth errors
const originalFetch = window.fetch;
window.fetch = function(...args) {
  return originalFetch.apply(this, args).then(response => {
    // Check for authentication errors
    if (response.status === 401 || response.status === 403) {
      isRedirecting = true;
      window.location.href = '/';
      return Promise.reject(new Error('Session expired'));
    }
    return response;
  }).catch(error => {
    // If fetch fails and it's an auth-related error, redirect
    if (error.message && (error.message.includes('401') || error.message.includes('403'))) {
      isRedirecting = true;
      window.location.href = '/';
    }
    throw error;
  });
};

// Profile dropdown handlers
document.getElementById('profile-icon').addEventListener('click', function(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('profile-dropdown');
  dropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const container = document.getElementById('profile-dropdown-container');
  const dropdown = document.getElementById('profile-dropdown');
  if (container && dropdown && !container.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// My Account handler
document.getElementById('my-account-item').addEventListener('click', function() {
  document.getElementById('profile-dropdown').classList.remove('show');
  window.location.href = '/my-account';
});

// Sign Out handler
document.getElementById('signout-item').addEventListener('click', async () => {
  document.getElementById('profile-dropdown').classList.remove('show');
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    if (response.ok) {
      localStorage.removeItem('lcc_ap_remember');
      window.location.href = '/';
    } else {
      console.error('Logout failed');
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Logout error:', error);
    window.location.href = '/';
  }
});

// Close modal when clicking outside of content
window.addEventListener('click', (event) => {
const alertModal = document.getElementById('alert-modal');
const prayerModal = document.getElementById('prayer-modal');
const missingCaseModal = document.getElementById('missing-case-modal');

if (event.target === alertModal) {
  closeModal('alert-modal');
}
if (event.target === prayerModal) {
  closeModal('prayer-modal');
}
if (event.target === missingCaseModal) {
  closeModal('missing-case-modal');
}
});

// Add keyboard support for closing modals with Escape key
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
  console.log('Escape key pressed, closing any open modals');
  closeModal('alert-modal');
  closeModal('prayer-modal');
  closeModal('missing-case-modal');
}
});

// Helper function for debouncing search input
function debounce(func, delay) {
let timer;
return function() {
  const context = this;
  const args = arguments;
  clearTimeout(timer);
  timer = setTimeout(() => func.apply(context, args), delay);
};
}
</script>
<footer style="position: relative; bottom: 40px; text-align: right; color: #666666; font-size: 12px; font-style: italic; padding: 20px;">
  <p style="margin: 5px 0 0 0; font-size: 11px; opacity: 0.8;">
    Legal Command Centre (Powered by Valuepitch)
  </p>
</footer>
</body>
</html>
    ` }} />
  )
}

