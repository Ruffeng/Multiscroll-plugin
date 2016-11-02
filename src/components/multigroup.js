import React from 'react';
export default class MultiGroup extends React.Component {
  // Default options
  constructor(props){
    super(props);
    this.state={scroller: "scroller", nPage: 1, count: React.Children.count(this.props.children), height: document.documentElement.clientHeight };
    this.onWheel= this.onWheel.bind(this);
    this.selectPage=this.selectPage.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.scrollAllow=true;
    this.animTime=this.props.animTime || 3.0;
    this.webLeft=[];
    this.webRight=[];
    this.initPosition=0;
    this.lastPosition=0;
    this._defineContent();
  }

  // A Listener to check if the window has changed its height
  componentDidMount() {
       window.addEventListener("resize", this._handleResize);
  }
  // Internal function to change the size of the height on the screen dinamically
  _handleResize(){
      this.setState({height: document.documentElement.clientHeight})
  }
  // Function to iterate the sons of <Multiscroll> component
  _defineContent(){
       React.Children.map(this.props.children, (child,key) => {
          //Once that we iterate, we have <leftSide> and <rightSide>, so we call another function to iterate it, too.
          this._setSidePage(child,key);
       })
  }
  // Function to know which side is sending, left or right. We check with switch...
  _setSidePage(child,key){
      if (child.type === "multiScroll"){
            const bgColor = child.props.bgColor; //defining a background color
            React.Children.map(child.props.children, (section) => {
                switch(section.type){ //Pushing the content on one of the arrays, left or right
                  case "leftSide" :
                    this.webLeft.push({page: key, content: section.props.children, bgColor });
                    break;
                  case "rightSide" :
                    this.webRight.push({page: key, content: section.props.children, bgColor});
                    break;
                }
            })
      }
  }
  // Forbid to do any scrolling meanwhile the slide transaction is running
  _changeScrallow(step){
    if (this.scrollAllow && step >= 1 && step <= this.state.count){
          this.scrollAllow = false;
          setTimeout(()=>{this.scrollAllow=true},(this.animTime*1000));
          this.selectPage(step);
    }
  }

  // Function to move between slides touching on mobile devices. We take the first position of the touch on screen
  onTouchStart(e){
    this.initPosition = e.touches[0].screenY
  }
  // Store the last position on the touch.
  onTouchMove(e){
    this.lastPosition = e.touches[0].screenY;

  }
  //Calculate initposition vs last. In case that is negative. the finger has scrolled down from the screen. In cas of positive the finger has scrolled up from the screen
  onTouchEnd(d){
    if( !this.scrollAllow){
      d.preventDefault();
    }
    else{
      const direction = this.initPosition - this.lastPosition;
      let step;
      if (direction < 0 && direction < -150){
        // Scroll down . Change the symbol to negative if you want to invert the order
        step = this.state.nPage+1
      }
      if (direction > 0 && direction > 150) {
        // Scroll up . Change the symbol to positive if you want to invert the order
          step = this.state.nPage-1
      }
      this._changeScrallow(step);
    }
  }

  //Function to deal when you wheel down or up
  onWheel(e){

    if( !this.scrollAllow){
      e.preventDefault();
    }
    else{
      if (e.deltaY !== 0){ // if created to avoid weird behaviors on trackpads
        e.preventDefault();
        const step = e.deltaY > 0 ? this.state.nPage+1 : this.state.nPage-1; //Calculate if it has scrolled down or up
        this._changeScrallow(step);
      }
    }
  }
  selectPage(nPage){    //Set the current page on the state
      this.setState({nPage});
      this.setState({scroller: `scroller page-${nPage}`});
  }
  //Render the contents of each part specifying page number in a class
  renderList(list){
          return(
            list.map((content)=>{
              return(
                <div className={`page page-${content.page+1}`}
                style={{ height:`${this.state.height}px`, backgroundColor:content.bgColor }}
                key={content.page}>{content.content}</div>
              )
            })
          );
      }
  render(){
    const contRight=this.webRight.slice().reverse();
    const contLeft=this.webLeft;
    const {nPage}= this.state;
    const transition= `all ${this.animTime}s`;
    return (
        <div onWheel={this.onWheel} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} className={this.state.scroller}>
            <div className="left" style={{top:`-${this.state.height*(nPage-1)}px`,transition}}>
                {this.renderList(contLeft)}
            </div>

            <div className="right" style={{bottom:`-${this.state.height*(nPage-1)}px`,transition}}>
                {this.renderList(contRight)}
            </div>

            <div className="dotstyle">
                  <ul>
                    {contLeft.map((e,i)=><Menu key={i}
                    onPress={this.selectPage}
                    step={i+1}
                    selected={nPage===i+1}/>)}
                  </ul>
                </div>
        </div>
    );
  }
}

// Class to give the calculate the menu buttons and put the bullets
class Menu extends React.Component {
   constructor(props){
      super(props);
      this.onClick=this.onClick.bind(this);
    }
    onClick(){
      this.props.onPress(this.props.step)
    }
    render(){
      const {selected}= this.props;
      const select =selected?'current':'';
      return <li className={`${select}`}><a href="#" onClick={this.onClick}> </a></li>;
      }
}

