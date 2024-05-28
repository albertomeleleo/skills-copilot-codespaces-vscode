function skillMember() {
    console.log('skillMember');
    // this指向window
    console.log(this);
    console.log('this.id:', this.id);
    console.log('this.name:', this.name);
    console.log('this.age:', this.age);
}