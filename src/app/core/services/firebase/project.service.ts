import {inject, Injectable} from '@angular/core';
import {Project} from '../../models/project.model';
import {addDoc, collection, doc, FieldValue, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public readonly PROJECT_COLLECTION_NAME = 'projects';

  private _fireStore = inject(Firestore);

  // addProject(project: Project) {
  //   const projectRef = this._db.collection(this.PROJECT_COLLECTION_NAME).doc();
  //   project.id = projectRef.id;
  //   return projectRef.set(project);
  // }
  //
  // getProjects() {
  //   return this._db.collection(this.PROJECT_COLLECTION_NAME).valueChanges();
  // }
  //
  // getProjectById(id: string) {
  //   return this._db.collection(this.PROJECT_COLLECTION_NAME).doc(id).valueChanges();
  // }
  //
  // updateProject(project: Project) {
  //   return this._db.collection(this.PROJECT_COLLECTION_NAME).doc(project.id).update(project);
  // }
  //
  // deleteProject(id: string) {
  //   return this._db.collection(this.PROJECT_COLLECTION_NAME).doc(id).delete();
  // }
  // createDocumentId() {
  //   return doc(collection(this._fireStore, this.PROJECT_COLLECTION_NAME)).id;
  // }
  // createDocumentIdFn = (colNam: string) => doc(collection(this._fireStore, colNam)).id;

  /**
   * Create document id
   * @param colNam
   */
  createDocumentId(colNam: string) {
    return doc(collection(this._fireStore, colNam)).id;
  }

  /**
   * Add project
   * @param project
   */
  addProject(project: Project<FieldValue>) {
    const projectColRef = collection(this._fireStore, this.PROJECT_COLLECTION_NAME);
    return addDoc(projectColRef, project);
  }


  /**
   * Update project
   * @param project
   */
  updateProject(project: Project<FieldValue>) {
    // const projectRef = doc(this._fireStore, this.PROJECT_COLLECTION_NAME, project.id);
    const projectColRef = collection(this._fireStore, this.PROJECT_COLLECTION_NAME);
    const projectDocRef = doc(projectColRef, project.id);
    return updateDoc(projectDocRef, {...project});
  }

  /**
   * Set project (add or update)
   * @param project
   */
  setProject(project: Project<FieldValue>) {
    const projectColRef = collection(this._fireStore, this.PROJECT_COLLECTION_NAME);
    const projectDocRef = doc(projectColRef, project.id);
    return setDoc(projectDocRef, project, {merge: true});
  }
}
