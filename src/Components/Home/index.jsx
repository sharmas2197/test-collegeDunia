import React, { Component } from "react";
import "./index.css";
import college_result from "../../Store/colleges";
import { price_tag } from "../../Assets/Assets";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      loading: false,
      totalCollege: college_result.colleges.length,
      containerRef: React.createRef(),
    };
  }
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.state.containerRef.current.addEventListener("scroll", () => {
      if (
        this.state.containerRef.current.scrollTop +
          this.state.containerRef.current.clientHeight >=
        this.state.containerRef.current.scrollHeight
      ) {
        this.setState({
          offset: this.state.offset + 10,
        });
        this.loadMore();
      }
    });
  }

  renderOfferText(str) {
    var parts = str.split(" ");
    for (var i = 0; i < parts.length; i++) {
      parts[i] = (
        <span
          className="match"
          key={i}
          style={{
            color:
              parts[i] === "LOGIN"
                ? "#1999d2"
                : !isNaN(parts[i])
                ? "#4bb89e"
                : parts[i].includes("Rs")
                ? "#4bb89e"
                : "#444444",
          }}
        >
          {`${parts[i]} `}
        </span>
      );
    }
    return <div>{parts}</div>;
  }

  renderFamousPlaces(str) {
    var parts = str.split(" ");
    for (var i = 0; i < parts.length; i++) {
      parts[i] = (
        <span
          className="match"
          key={i}
          style={{
            color: !isNaN(parts[i])
              ? "#444444"
              : parts[i].includes("km") || parts[i].includes("Km")
              ? "#444444"
              : "#adadad",
          }}
        >
          {`${parts[i]} `}
        </span>
      );
    }
    return <span>{parts}</span>;
  }

  showItems() {
    var endIndex = this.state.offset + 10;

    let tempData = college_result.colleges.slice(0, endIndex);

    return tempData.map((item, i) => {
      return (
        <div className="college_card" key={i}>
          {/* promoted tag starts */}
          {item.promoted ? (
            <div className="promoted">
              <div className="promoted_flag_block">
                <span className="promoted_flag">
                  <span />
                  promoted
                </span>
              </div>
            </div>
          ) : null}
          {/* promoted tag ends */}

          {/* top block starts */}
          <div className="top_block">
            <img src={item.image} alt={item.college_name} />
            <div className="overlay" />

            {/* rating starts */}
            <div className="rating">
              <div className="rating-text">
                <div>
                  <span className="rating-text-style">{item.rating}</span>/5
                </div>
                <div>{item.rating_remarks}</div>
              </div>
            </div>
            {/* rating ends */}

            {/* tags starts */}
            <div className="tag-college">
              {item.tags.map((tag, j) => {
                return (
                  <span className="tag-college-button" key={j}>
                    {tag}
                  </span>
                );
              })}
              <div className="ranking">#{item.ranking}</div>
            </div>
            {/* tags ends */}
          </div>
          {/* top block ends */}

          {/* middle block starts */}
          <div className="middle_block">
            {/* college-detail starts */}
            <div className="college-detail">
              <div className="college_name">{item.college_name}</div>
              <div className="nearest_place">
                {item.nearest_place.map((nplace, n) => {
                  return <span key={n}>{nplace}</span>;
                })}
              </div>
              <div className="famous_nearest_places">
                <span className="match">93% Match : </span>
                {this.renderFamousPlaces(item.famous_nearest_places)}
              </div>
            </div>
            {/* college-detail ends */}
            {/* fee detail starts */}
            <div className="college-fee">
              <div className="original_fees">
                <span className="original">
                  &#8377;
                  {item.original_fees}
                </span>
                <span
                  style={{
                    background: `url(${price_tag}) no-repeat`,
                    backgroundSize: "100% 100%",
                    width: "36px",
                    height: "18px",
                    display: "inline-block",
                    marginLeft: "10px",
                    paddingLeft: "4px",
                    textAlign: "center",
                  }}
                >
                  {item.discount}
                </span>
              </div>
              <div className="discounted_fee">
                <div className="fee"> &#8377; {item.discounted_fees}</div>
                <div className="fee_cycle">{item.fees_cycle}</div>
              </div>
            </div>
            {/* fee detail ends */}
          </div>
          {/* middle block ends */}

          {/* bottom block starts */}
          <div className="bottom_block">
            <div className="offer-button">
              {this.renderOfferText(item.offertext)}
            </div>
            <ul className="amenties-list">
              {item.amenties.map((ame, a) => {
                return <li key={a}>{ame}</li>;
              })}
            </ul>
          </div>
          {/* middle block ends */}
        </div>
      );
    });
  }

  loadMore() {
    if (this.state.offset < this.state.totalCollege) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    return (
      <section className="container" ref={this.state.containerRef}>
        <div className="inner-container">
          <header className="header">Colleges In North India</header>
          <div>
            <div className="card-container">{this.showItems()}</div>
            {this.state.loading ? (
              <p
                className="App-intro"
                style={{ fontSize: "20px", color: "#4444444" }}
              >
                loading ...
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
