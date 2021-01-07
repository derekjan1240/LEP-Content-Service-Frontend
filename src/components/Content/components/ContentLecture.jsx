import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  AppBar,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import AppBreadcrumbs from "../../AppBreadcrumbs";

const fakeData = [
  {
    stage: "國小",
    grades: [
      {
        title: "一年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                  {
                    title: "章節二",
                  },
                  {
                    title: "章節三",
                  },
                ],
              },
              {
                title: "單元二",
                description: "單元二的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                  {
                    title: "章節二",
                  },
                  {
                    title: "章節三",
                  },
                  {
                    title: "章節四",
                  },
                ],
              },
              {
                title: "單元三",
                description: "單元三的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                  {
                    title: "章節二",
                  },
                  {
                    title: "章節三",
                  },
                  {
                    title: "章節四",
                  },
                  {
                    title: "章節五",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "二年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "三年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "四年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "五年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "六年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stage: "國中",
    grades: [
      {
        title: "一年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "二年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "三年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stage: "高中",
    grades: [
      {
        title: "一年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "二年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "三年級",
        subjects: [
          {
            title: "語文",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "數學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "社會",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "自然科學",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "藝術",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "綜合活動",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "科技",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
          {
            title: "健康與體育",
            units: [
              {
                title: "單元一",
                description: "單元一的相關介紹",
                chapters: [
                  {
                    title: "章節一",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    width: "100%",
  },
  root2: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 140,
    margin: 30,
    backgroundSize: "contain",
  },
}));

function setProps(index, type) {
  return type
    ? {
        id: `subject-tab-${index}`,
        "aria-controls": `subject-tabpanel-${index}`,
      }
    : {
        id: `stage-tab-${index}`,
        "aria-controls": `stage-tabpanel-${index}`,
      };
}

function getTabsContent(datas, type) {
  return datas.map((data, index) => {
    return <Tab label={data.title} {...setProps(index, type)} />;
  });
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={
        props.type === 1
          ? `subject-tabpanel-${index}`
          : `stage-tabpanel-${index}`
      }
      aria-labelledby={
        props.type === 1 ? `subject-tab-${index}` : `stage-tab-${index}`
      }
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function getSubjectTabPanelsContent(grades, value, classes) {
  return grades.map((grade, index) => {
    return (
      <TabPanel className={classes.tabPanel} value={value} index={index}>
        <SubjectsTabs subjectData={grade.subjects} />
      </TabPanel>
    );
  });
}

function getUnitTabPanelsContent(subjects, value) {
  return subjects.map((subject, index) => {
    return (
      <TabPanel value={value} index={index} type={0}>
        <Grid container spacing={3} justify="flex-start">
          <MediaCards units={subject.units} />
        </Grid>
      </TabPanel>
    );
  });
}

function MediaCards(props) {
  return props.units.map((unit) => {
    return <MediaCard title={unit.title} description={unit.description} />;
  });
}

function toVideoLayer(props) {
  console.log(props);
  // window.location.href = "/content/video/123";
}

function MediaCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={3}>
      <Card>
        <CardActionArea onClick={() => toVideoLayer(props)}>
          <CardMedia
            className={classes.media}
            image="/Book.svg"
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" color="primary">
            收藏課程
          </Button>
          <Button variant="contained" color="secondary">
            功能鈕
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

// 年級
function GradesTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="年級選單"
        className={classes.tabs}
      >
        {getTabsContent(props.stageData.grades, 1)}
      </Tabs>
      {getSubjectTabPanelsContent(props.stageData.grades, value, classes)}
    </div>
  );
}

// 科目 & 單元
function SubjectsTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root2}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="科目 和 單元 選單"
        >
          {getTabsContent(props.subjectData, 0)}
        </Tabs>
      </AppBar>
      {getUnitTabPanelsContent(props.subjectData, value)}
    </div>
  );
}

export default function ContentLecture() {
  let { stage_id } = useParams();
  const breadcrumbs = [
    {
      title: "Stages",
      href: "/content/stages",
    },
    {
      title: "Current > Stage:" + stage_id,
      href: null,
    },
  ];
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box mx={5}>
          <AppBreadcrumbs breadcrumbs={breadcrumbs} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box p={5}>
          <GradesTabs stageData={fakeData[stage_id]} />
        </Box>
      </Grid>
    </Grid>
  );
}
