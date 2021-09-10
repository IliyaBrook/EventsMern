import styled from "styled-components"

export const CalendarModalStyled = styled.div`
  
  button {
    letter-spacing: 1px;
  }

  .btn:nth-child(1) {
         background-color: red;
         margin-right: 1rem;
  }
  .btn:nth-child(2) {
    background-color: red;
  }

  .modal {
    height: auto
  }

  @media (min-width: 768px) {
    .calendarModal {
      border-radius: 5px;
      width: 80% !important;

      .modalHeader {
        height: 12%;
        padding: 30px;

        h4 {
          font-size: 160%;
          margin: 0;
        }
      }

      .calendarModalContent {
        padding: 2%;
        border-radius: 0;
        height: auto;

        .eventInfoWrapper {
          display: flex;
          justify-content: space-between;

          span {
            display: block;
            white-space: nowrap;
            margin: 0;
          }

          div {
            padding: 2%;

            span:nth-child(1) {
              display: block;
              font-weight: bold;
            }
          }
        }

        .descriptionWrapper {
          padding: 2%;
        }
      }

      .calendarModalFooter {
        padding: 1rem;
        height: auto;

        .btnWrapper {
          width: 50%;
          display: flex;
          justify-content: flex-end;

          .btn:nth-child(1) {
            background-color: blue;
            margin-right: 1rem;
          }

          .btn:nth-child(2) {
            background-color: red;
            margin-right: 1rem;
          }
        }

      }
    }
  }

  @media (min-width: 446px) and (max-width: 768px) {
    .calendarModalContent {
      border-radius: 0;

      .eventInfoWrapper {
        display: flex;
        justify-content: space-between;

        span {
          display: block;
          white-space: nowrap;
          margin: 0;
        }

        div {
          padding: 2%
        }
      }
    }

    .modal .modal-footer {
      height: 25%;

      .btn:nth-child(1) {
        background-color: blue;
        margin-right: 1rem;
      }

      .btn:nth-child(2) {
        background-color: red;
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 446px) {
    .eventInfoWrapper {
      display: flex;
      justify-content: space-between;

      span {
        display: block;
        white-space: normal;
        margin: 0;
      }

      div {
        padding: 2%
      }
    }

    .calendarModalFooter {
      height: auto;

      .btn:nth-child(1) {
        background-color: blue;
        margin-right: 1rem;
      }

      .btn:nth-child(2) {
        background-color: red;
        margin-right: 1rem;
      }
    }
  }

`
