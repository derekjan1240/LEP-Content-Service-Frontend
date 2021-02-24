import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

function getBreadcrumbItems(breadcrumbs) {
  return breadcrumbs.map((breadcrumb, index) => {
    return breadcrumb.href ? (
      <Link component={RouterLink} color="inherit" to={breadcrumb.href}>
        {breadcrumb.title}
      </Link>
    ) : (
      <Typography color="textPrimary">{breadcrumb.title}</Typography>
    );
  });
}

export default function AppBreadcrumbs(props) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {getBreadcrumbItems(props.breadcrumbs)}
    </Breadcrumbs>
  );
}
