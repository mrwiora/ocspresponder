# GitHub Workflows

## Release Workflow

The `release.yml` workflow automatically builds and publishes Docker images when a new version tag is pushed.

### Setup Requirements

Before using this workflow, you need to configure the following secrets in your GitHub repository:

1. **DOCKER_USERNAME**: Your Docker Hub username
2. **DOCKER_PASSWORD**: Your Docker Hub password or access token

To add these secrets:
1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add both `DOCKER_USERNAME` and `DOCKER_PASSWORD`

### How to Use

1. **Create and push a version tag:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. The workflow will automatically:
   - Build the Docker image from the Dockerfile
   - Tag it with multiple versions (e.g., `1.0.0`, `1.0`, `1`, `latest`)
   - Push it to Docker Hub as `docker.io/mrwiora/ocspresponder`
   - Create a GitHub release with release notes

3. **Pull the image:**
   ```bash
   docker pull docker.io/mrwiora/ocspresponder:latest
   # or a specific version
   docker pull docker.io/mrwiora/ocspresponder:1.0.0
   ```

### Tag Format

The workflow triggers on tags matching the pattern `v*.*.*` (semantic versioning):
- ✅ `v1.0.0`
- ✅ `v2.1.3`
- ✅ `v0.1.0-beta`
- ❌ `1.0.0` (missing 'v' prefix)
- ❌ `release-1.0` (doesn't match pattern)

### Multi-Architecture Support

The workflow builds images for:
- `linux/amd64` (x86_64)
- `linux/arm64` (ARM 64-bit)

This ensures compatibility with various platforms including Apple Silicon Macs and ARM-based servers.
