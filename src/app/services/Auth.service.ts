import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any; // Store the current user data

  constructor() {
    // Assuming you have a way to retrieve the current user data
    // and store it in the `currentUser` property
    this.currentUser = this.getCurrentUser();
  }

  getCurrentUser(): any {
    // Implement your logic to retrieve the current user data
    // For example, you can fetch it from localStorage or a backend API
    // Return the user data or null if no user is authenticated
    return null;
  }

  isManager(): boolean {
    // Implement your logic to determine if the current user is a manager
    // Use the `currentUser` data to perform the check
    // Return true if the user is a manager, otherwise return false
    // You can use any condition or property of the user data to determine the manager status
    // For example, if your user data has a `role` property and managers have role 'manager', you can do:
    return this.currentUser && this.currentUser.role === 'manager';
  }
}
