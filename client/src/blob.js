

class Blob{
    //These are all of the variables each blob needs to be a blob
    constructor (p5, r, x, y, id, name) {
        this.p5 = p5;
        this.pos = p5.createVector(x, y);
        this.r = r;
        this.vel = p5.createVector(0,0);
        this.red = p5.random(35, 255);
        this.blue = p5.random(35, 255);
        this.green = p5.random(35, 255);
        this.name = name;
        this.id = id;
        this.alive = true;
    }
    
    //https://www.youtube.com/watch?v=JXuxYMGe4KI
    //This prints the blob
    show = function() {
        this.p5.fill(this.red, this.green, this.blue);
        this.p5.ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
        this.p5.fill(255);
        this.p5.textAlign(this.p5.CENTER);
        this.p5.textSize(3);
        this.p5.text(this.name, this.pos.x, this.pos.y + this.r); 
    }

    //https://www.youtube.com/watch?v=JXuxYMGe4KI
    //This moves the blob
    update = function() {
        let new_vel = this.p5.createVector(this.p5.mouseX-this.p5.width/2, this.p5.mouseY-this.p5.height/2 );
        new_vel.setMag(3);
        this.vel.lerp(new_vel, 0.1); 
        this.pos.add(this.vel);

    }

    //https://www.youtube.com/watch?v=ZjVyKXp9hec
    //This keeps the blob inside the board
    //Changed blob to this
    constrain= function() {
        this.pos.x = this.p5.constrain(this.pos.x, -this.p5.width, this.p5.width);
        this.pos.y = this.p5.constrain(this.pos.y, -this.p5.height, this.p5.height);
    }

    //https://www.youtube.com/watch?v=JXuxYMGe4KI
    eats = function(other) {
        //This is the distance formal
        
        let d = Math.sqrt(((other.pos.x - this.pos.x)**2)+((other.pos.y-this.pos.y)**2))
     
        //A blob can only eat another blob if they are closer together than their two 
        //radi (they are overlapping) and if it is bigger than the one it is eating
        if ((d < this.r + other.r) && (this.r > other.r)){//
            let sum = this.p5.PI *this.r *this.r + this.p5.PI * other.r *other.r;
            this.r = (this.p5.sqrt(sum / this.p5.PI));
            return true;
        } else {
            return false;
        }
        
    }
}
export default Blob;