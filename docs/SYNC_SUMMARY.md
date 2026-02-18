# Frontend/Backend Sync Summary

**Status**: Ready to merge

## Endpoints Added (13)

- `POST /api/auth/refresh`
- `POST /api/patients`, `PUT /api/patients/:id`, `DELETE /api/patients/:id`
- `POST /api/predictions`, `DELETE /api/predictions/:id`
- `PUT /api/simulations/:id`, `DELETE /api/simulations/:id`

## Other Changes

- Standardized query params with `URLSearchParams`
- Counter-based ID generation (no duplicates)
- Improved error messages
- Full API documented in `API_SPEC.md`

## Next Steps

1. Implement backend per `API_SPEC.md`
2. Integration testing
3. Configure production env vars
